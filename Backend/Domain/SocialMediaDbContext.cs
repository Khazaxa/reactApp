using Domain.Comments.Entities;
using Domain.Folders.Entities;
using Domain.Images.Entities;
using Domain.Posts.Entities;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain;

internal class SocialMediaDbContext : DbContext
{
    public SocialMediaDbContext(DbContextOptions<SocialMediaDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<Folder> Folders { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        User.OnModelCreating(modelBuilder);
        Image.OnModelCreating(modelBuilder);
        Folder.OnModelCreating(modelBuilder);
        Post.OnModelCreating(modelBuilder);
        Comment.OnModelCreating(modelBuilder);
    }
}