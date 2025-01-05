using Domain.Images.Entities;

namespace Domain.Folders.Dtos;

public record FolderDto(
    int id,
    string Name,
    Image Logo,
    List<Image> Images
    );