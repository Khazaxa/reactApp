using Domain.Users.Dtos;
using Domain.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("")]
public class UsersController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [Route("users")]
    public Task<IQueryable<UserDto>> GetUsers(CancellationToken cancellationToken)
        => mediator.Send(new UsersGetQuery(), cancellationToken);
}