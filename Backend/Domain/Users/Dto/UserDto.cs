using Domain.Users.Enums;

namespace Domain.Users.Dtos;

public record UserDto(
    int Id,
    string? Name,
    string Email,
    int? Age,
    UserRole Role);