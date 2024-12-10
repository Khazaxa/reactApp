using Core.Database;
using Domain.Images.Entities;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Folders.Entities;

public class Folder : EntityBase
{
    private Folder() { }
    
    public Folder(string name, int userId)
    {
        Name = name;
        UserId = userId;
    }
    
    public string Name { get; private set; }
    public Image? Logo { get; private set; }
    public List<int>? ImageId { get; private set; }
    public List<Image>? Image { get; private set; }
    public int UserId { get; private set; }
    public User User { get; private set; }
    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Folder>().HasIndex(x => x.Name).IsUnique();
        builder.Entity<Folder>()
            .HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId);
    }
}