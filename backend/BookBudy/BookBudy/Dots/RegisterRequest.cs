﻿// File: `Dots/RegisterRequest.cs`
namespace BookBudy.Dots
{
    public class RegisterRequest
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string? DisplayName { get; set; }
    }
}
