using Domain.Images.Entities;

namespace Domain.Folders.Dtos;

public record FolderDto(
    int id,
    string Name,
    int UserId,
    string UserName,
    Image Logo,
    List<Image> Images
    );