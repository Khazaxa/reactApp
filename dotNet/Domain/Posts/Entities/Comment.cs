using Core.Database;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Posts.Entities;

public class Comment : EntityBase
{
    private Comment() { }
    
    public Comment(string content, int authorId)
    {
        Content = content;
        AuthorId = authorId;
        CreatedAt = DateTime.UtcNow;
    }
    
    public string Content { get; set; }
    public int AuthorId { get; set; }
    public User Author { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasOne(c => c.Author)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}