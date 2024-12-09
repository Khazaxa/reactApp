using Domain.Users.Enums;

namespace Domain.Users.Dtos;

public record UserDto(
    string? Name,
    string Email,
    int? Age,
    UserRole Role);