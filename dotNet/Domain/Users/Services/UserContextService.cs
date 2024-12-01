using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Domain.Users.Services;

public class UserContextService(IHttpContextAccessor accessor) : IUserContextService
{
    public int GetUserId()
    {
        ClaimsPrincipal user = accessor.HttpContext.User;
        return int.Parse(user.FindFirst(c 
            => c.Type == ClaimTypes.NameIdentifier)?.Value ?? throw new InvalidOperationException());
    }
}