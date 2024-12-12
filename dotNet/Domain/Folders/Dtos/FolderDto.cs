using Domain.Images.Entities;

namespace Domain.Folders.Dtos;

public record FolderDto(
    string Name,
    Image Logo,
    List<Image> Images
    );