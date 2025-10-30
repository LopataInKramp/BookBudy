#nullable enable
namespace BookBudy.Dots;

public class AuthResponse
{
    public string? Token { get; }
    public object? User { get; }

    public AuthResponse(string? token, object? user)
    {
        Token = token;
        User = user;
    }
}
#nullable restore
