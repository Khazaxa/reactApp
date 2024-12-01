using Domain.Users.Enums;

namespace Domain.Authentication.Dto;

public record LoginResponse(
    string? Email,
    UserRole? Role,
    string? AccessToken
);