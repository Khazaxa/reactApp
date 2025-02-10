namespace Domain.Images.Dtos;

public record ImageDto(
    int Id,
    string Name,
    string Extension,
    decimal Size,
    string Path,
    int UserId,
    string UserName
    );