using Core.Database;
using Microsoft.EntityFrameworkCore;

namespace Domain.Images.Entities;

public class Image : EntityBase
{
    private Image() {}
    
    public Image(string name, string ext, decimal size, string path)
    {
        Name = name;
        Extension = ext;
        Size = size;
        Path = path;
    }
    
    public string Name { get; private set; }
    public string Extension { get; private set; }
    public decimal Size { get; private set; }
    public string Path { get; private set; }
    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Image>().HasIndex(x => x.Name).IsUnique();
    }
}