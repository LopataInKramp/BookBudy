// File: `Models/User.cs`
using System;
    
namespace BookBudy.Models
{
    public class User
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Email { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;
        public string? DisplayName { get; set; }
    }
}