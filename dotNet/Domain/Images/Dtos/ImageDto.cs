namespace Domain.Images.Dtos;

public record ImageDto(
    string Name,
    string Extension,
    decimal Size,
    string Path,
    int UserId);