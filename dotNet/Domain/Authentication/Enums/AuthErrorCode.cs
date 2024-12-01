namespace Domain.Authentication.Enums;

public enum AuthErrorCode
{
    InvalidPassword = 1,
    InvalidData = 2,
    JwtExpireDaysNotConfigured = 3
}