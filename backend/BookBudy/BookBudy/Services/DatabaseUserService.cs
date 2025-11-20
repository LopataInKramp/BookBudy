using System.Threading.Tasks;
using BookBudy.Dots;
using BookBudy.Models;
using Microsoft.EntityFrameworkCore;
using BookBudy.Data;
using Microsoft.AspNetCore.Identity;

namespace BookBudy.Services
{
    public class DatabaseUserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _hasher = new();

        public DatabaseUserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(bool Success, string? Error, object? User)> RegisterAsync(RegisterRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
                return (false, "Email and password are required.", null);

            if (await _context.Users.AnyAsync(u => u.email == req.Email))
                return (false, "Email already registered.", null);

            var user = new User
            {
                email = req.Email,
                username = req.DisplayName
            };
            user.password_hash = _hasher.HashPassword(user, req.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var safe = new { Id = user.user_id, Email = user.email, DisplayName = user.username };
            return (true, null, safe);
        }

        public async Task<(bool Success, string? Token, object? User)> AuthenticateAsync(LoginRequest req)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.email == req.Email);
            if (user == null)
                return (false, null, null);

            var verify = _hasher.VerifyHashedPassword(user, user.password_hash, req.Password);
            if (verify != PasswordVerificationResult.Success)
                return (false, null, null);

            var safe = new { Id = user.user_id, Email = user.email, DisplayName = user.username };
            return (true, "<JWT_TOKEN_PLACEHOLDER>", safe); // Replace with actual JWT generation logic
        }

        public User? GetById(string id)
        {
            return _context.Users.Find(id);
        }
    }
}
