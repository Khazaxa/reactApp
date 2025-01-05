using Core.Database;
using Domain.Posts.Entities;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Comments.Entities;

public class Comment : EntityBase
{
    private Comment() { }
    
    public Comment(int postId, string content, int authorId)
    {
        PostId = postId;
        Content = content;
        AuthorId = authorId;
        CreatedAt = DateTime.UtcNow;
    }
    
    public string Content { get; private set; }
    public int AuthorId { get; private set; }
    public User Author { get; private set; }
    public int PostId { get; private set; }
    public Post Post { get; private set; }
    public DateTime CreatedAt { get; private set; }
    
    public static void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasOne(c => c.Author)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}