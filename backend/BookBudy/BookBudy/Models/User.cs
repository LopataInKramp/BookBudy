// File: `Models/User.cs`
using System;
    
namespace BookBudy.Models
{
    public class User
    {
        public int user_id { get; set; } = default;
        public string email { get; set; } = default!;
        public string password_hash { get; set; } = default!;
        public string? username { get; set; }
    }
}