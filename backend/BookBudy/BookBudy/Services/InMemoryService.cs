// File: `BookBudy/Services/InMemoryUserService.cs`
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookBudy.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace BookBudy.Services
{
    public class InMemoryUserService : IUserService
    {
        private readonly ConcurrentDictionary<string, User> _usersByEmail = new(StringComparer.OrdinalIgnoreCase);
        private readonly PasswordHasher<User> _hasher = new();
        private readonly byte[] _key;
        private readonly string _jwtIssuer;

        public InMemoryUserService(string jwtSecret, string jwtIssuer)
        {
            _jwtIssuer = jwtIssuer;
            _key = Encoding.UTF8.GetBytes(jwtSecret);
        }

        public Task<(bool Success, string? Error, object? User)> RegisterAsync(BookBudy.Dots.RegisterRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
                return Task.FromResult<(bool Success, string? Error, object? User)>((false, "Email and password are required.", null));

            if (_usersByEmail.ContainsKey(req.Email))
                return Task.FromResult<(bool Success, string? Error, object? User)>((false, "Email already registered.", null));

            var user = new User
            {
                Email = req.Email,
                DisplayName = req.DisplayName
            };
            user.PasswordHash = _hasher.HashPassword(user, req.Password);

            _usersByEmail[user.Email] = user;

            var safe = new { user.Id, user.Email, user.DisplayName };
            return Task.FromResult<(bool Success, string? Error, object? User)>((true, null, safe));
        }

        public Task<(bool Success, string? Token, object? User)> AuthenticateAsync(BookBudy.Dots.LoginRequest req)
        {
            if (!_usersByEmail.TryGetValue(req.Email, out var user))
                return Task.FromResult<(bool Success, string? Token, object? User)>((false, null, null));

            var verify = _hasher.VerifyHashedPassword(user, user.PasswordHash, req.Password);
            if (verify == PasswordVerificationResult.Failed)
                return Task.FromResult<(bool Success, string? Token, object? User)>((false, null, null));

            var token = GenerateToken(user);
            var safe = new { user.Id, user.Email, user.DisplayName };
            return Task.FromResult<(bool Success, string? Token, object? User)>((true, token, safe));
        }

        public User? GetById(string id)
        {
            foreach (var kv in _usersByEmail.Values)
            {
                if (kv.Id == id) return kv;
            }
            return null;
        }

        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("id", user.Id),
                new Claim("name", user.DisplayName ?? string.Empty)
            };

            var creds = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _jwtIssuer,
                audience: null,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}