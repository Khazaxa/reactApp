using Core.Database;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Posts.Entities;

public class Post : EntityBase
{
    private Post()
    {
    }

    public Post(string title, string content, int authorId)
    {
        Title = title;
        Content = content;
        AuthorId = authorId;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public string Title { get; private set; }
    public string Content { get; private set; }
    public int AuthorId { get; private set; }
    public User Author { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }
    public List<Comment> Comments { get; private set; }

    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasOne(p => p.Author)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}