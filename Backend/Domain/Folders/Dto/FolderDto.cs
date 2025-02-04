using Domain.Images.Entities;

namespace Domain.Folders.Dtos;

public record FolderDto(
    int id,
    string Name,
    int UserId,
    Image Logo,
    List<Image> Images
    );