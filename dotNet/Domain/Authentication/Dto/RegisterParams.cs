namespace Domain.Authentication.Dto;

public record RegisterParams(
    string Email,
    string Name,
    int Age,
    string Password,
    string ConfirmPassword
);