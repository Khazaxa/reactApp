namespace Domain.Images.Dto;

public record ImageDto(
    int Id,
    string Name,
    string Extension,
    decimal Size,
    string Path,
    string UserName,
    int UserId,
    int? FolderId);