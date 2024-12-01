using Core.Database;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Images.Entities;

public class Image : EntityBase
{
    private Image() {}
    
    public Image(string name, string ext, decimal size, string path, int userId)
    {
        Name = name;
        Extension = ext;
        Size = size;
        Path = path;
        UserId = userId;
    }
    
    public string Name { get; private set; }
    public string Extension { get; private set; }
    public decimal Size { get; private set; }
    public string Path { get; private set; }
    public int UserId { get; private set; }
    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Image>().HasIndex(x => x.Name).IsUnique();
        builder.Entity<Image>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(x => x.UserId);
    }
}