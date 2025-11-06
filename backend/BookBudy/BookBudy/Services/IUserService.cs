// File: `Services/IUserService.cs`
using System.Threading.Tasks;
using BookBudy.Models;
using BookBudy.Dots;

namespace BookBudy.Services
{
    public interface IUserService
    {
        Task<(bool Success, string? Error, object? User)> RegisterAsync(RegisterRequest req);
        Task<(bool Success, string? Token, object? User)> AuthenticateAsync(LoginRequest req);
        BookBudy.Models.User? GetById(string id);
    }
}