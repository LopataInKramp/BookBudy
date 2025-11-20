using Microsoft.EntityFrameworkCore;
using BookBudy.Models;

namespace BookBudy.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(u => u.email).IsUnique();
            modelBuilder.Entity<User>().HasKey(u => u.user_id);
            modelBuilder.Entity<User>().Property(u => u.user_id).ValueGeneratedOnAdd();
        }
    }
}
