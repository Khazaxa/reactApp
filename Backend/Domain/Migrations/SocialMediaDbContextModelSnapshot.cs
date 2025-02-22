﻿// <auto-generated />
using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Domain.Migrations
{
    [DbContext(typeof(SocialMediaDbContext))]
    partial class SocialMediaDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Comments.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("PostId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Domain.Folders.Entities.Folder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("LogoId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LogoId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Folders");
                });

            modelBuilder.Entity("Domain.Images.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Extension")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FolderId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Size")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FolderId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Domain.Posts.Entities.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Content")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Domain.Users.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Age")
                        .HasColumnType("int");

                    b.Property<int?>("AvatarImageId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AvatarImageId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "user@example.com",
                            Name = "User",
                            PasswordHash = new byte[] { 48, 176, 20, 106, 39, 235, 47, 152, 176, 109, 30, 221, 166, 164, 120, 156, 81, 80, 226, 63, 121, 59, 165, 254, 245, 251, 226, 128, 102, 14, 68, 186, 82, 78, 46, 231, 146, 238, 172, 132, 59, 224, 26, 163, 142, 47, 31, 112, 150, 40, 46, 61, 2, 123, 154, 187, 59, 241, 237, 62, 67, 215, 33, 103 },
                            PasswordSalt = new byte[] { 51, 12, 215, 28, 115, 205, 59, 234, 103, 164, 163, 117, 31, 39, 142, 209, 127, 225, 159, 3, 2, 27, 183, 44, 228, 35, 60, 221, 133, 223, 40, 152, 73, 230, 147, 132, 216, 175, 11, 168, 249, 196, 156, 122, 198, 14, 185, 150, 70, 108, 179, 188, 10, 83, 28, 156, 218, 80, 93, 68, 153, 232, 178, 61, 17, 255, 25, 118, 104, 101, 157, 210, 4, 87, 48, 162, 224, 74, 0, 115, 252, 77, 88, 108, 39, 129, 169, 117, 53, 82, 152, 107, 239, 204, 144, 161, 128, 138, 113, 29, 231, 135, 215, 7, 221, 101, 54, 222, 10, 107, 174, 134, 101, 86, 74, 0, 247, 103, 231, 9, 175, 17, 252, 184, 35, 119, 59, 199 },
                            Role = 1
                        });
                });

            modelBuilder.Entity("Domain.Comments.Entities.Comment", b =>
                {
                    b.HasOne("Domain.Users.Entities.User", "Author")
                        .WithMany("Comments")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Domain.Posts.Entities.Post", "Post")
                        .WithMany("Comments")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Domain.Folders.Entities.Folder", b =>
                {
                    b.HasOne("Domain.Images.Entities.Image", "Logo")
                        .WithMany()
                        .HasForeignKey("LogoId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Domain.Users.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Logo");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Images.Entities.Image", b =>
                {
                    b.HasOne("Domain.Folders.Entities.Folder", "Folder")
                        .WithMany("Images")
                        .HasForeignKey("FolderId");

                    b.HasOne("Domain.Users.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Folder");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Posts.Entities.Post", b =>
                {
                    b.HasOne("Domain.Users.Entities.User", "Author")
                        .WithMany("Posts")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Domain.Users.Entities.User", b =>
                {
                    b.HasOne("Domain.Images.Entities.Image", "AvatarImage")
                        .WithMany()
                        .HasForeignKey("AvatarImageId");

                    b.Navigation("AvatarImage");
                });

            modelBuilder.Entity("Domain.Folders.Entities.Folder", b =>
                {
                    b.Navigation("Images");
                });

            modelBuilder.Entity("Domain.Posts.Entities.Post", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Domain.Users.Entities.User", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Posts");
                });
#pragma warning restore 612, 618
        }
    }
}
