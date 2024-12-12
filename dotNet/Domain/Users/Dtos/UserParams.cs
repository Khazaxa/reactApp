namespace Domain.Users.Dtos;

public record UserParams(
    string? Name,
    string? Email,
    int? Age
    );