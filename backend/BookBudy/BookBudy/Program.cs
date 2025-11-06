using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using BookBudy.Services;
using BookBudy.Dots;
using Microsoft.EntityFrameworkCore;
using BookBudy.Data;

var builder = WebApplication.CreateBuilder(args);

// JWT settings (use secure storage in production)
// NOTE: this default secret is only for local/dev. In production, set Jwt:Secret in user secrets or environment variables.
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "b3f1c2d4e5f67890a1b2c3d4e5f67890b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "bookbudy";
var key = Encoding.UTF8.GetBytes(jwtSecret);


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtIssuer,
        ValidateAudience = false,
        ValidateLifetime = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddAuthorization();
builder.Services.AddOpenApi();

// Add DbContext and PostgreSQL configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                      ?? "Host=localhost;Port=5432;Database=mydatabase;Username=admin;Password=admin123";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IUserService, DatabaseUserService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/signup", async (RegisterRequest req, IUserService userService) =>
{
    var result = await userService.RegisterAsync(req);
    if (!result.Success) return Results.BadRequest(new { error = result.Error });
    return Results.Created("/me", result.User);
});

app.MapPost("/login", async (LoginRequest req, IUserService userService) =>
{
    var auth = await userService.AuthenticateAsync(req);
    if (!auth.Success) return Results.Unauthorized();
    return Results.Ok(new AuthResponse(auth.Token, auth.User));
});

app.MapGet("/me", (System.Security.Claims.ClaimsPrincipal user, IUserService userService) =>
{
    var id = user.FindFirst("id")?.Value;
    if (string.IsNullOrEmpty(id)) return Results.Unauthorized();
    var u = userService.GetById(id);
    return u is null ? Results.NotFound() : Results.Ok(u);
}).RequireAuthorization();

app.Run();