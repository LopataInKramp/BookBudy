// File: `Services/IUserService.cs`
using System.Threading.Tasks;
using BookBudy.Models;

namespace BookBudy.Services
{
    public interface IUserService
    {
        Task<(bool Success, string? Error, object? User)> RegisterAsync(BookBudy.Dtos.RegisterRequest req);
        Task<(bool Success, string? Token, object? User)> AuthenticateAsync(BookBudy.Dtos.LoginRequest req);
        BookBudy.Models.User? GetById(string id);
    }
}