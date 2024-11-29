using Domain.Images.Entities;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain;

internal class ImgAppDbContext : DbContext
{
    public ImgAppDbContext(DbContextOptions<ImgAppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Image> Images { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        User.OnModelCreating(modelBuilder);
        Image.OnModelCreating(modelBuilder);
    }
}