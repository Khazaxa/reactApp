using Core.Database;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Posts.Entities;

public class Post : EntityBase
{
    private Post() {}
    
    public Post(string title, string content, int authorId)
    {
        Title = title;
        Content = content;
        AuthorId = authorId;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }
    
    public string Title { get; set; }
    public string Content { get; set; }
    public int AuthorId { get; set; }
    public User Author { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsPublished { get; set; }
    public bool IsDeleted { get; set; }
    public List<Comment> Comments { get; set; }
    
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