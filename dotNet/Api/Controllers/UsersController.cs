using Domain.Users.Commands;
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
    public async Task<IQueryable<UserDto>> GetUsers(CancellationToken cancellationToken)
    {
        return await mediator.Send(new UsersGetQuery(), cancellationToken);
    }

    [HttpPut]
    [Route("user/{id}")]
    public async Task<Unit> UpdateUser(int id, UserParams user, CancellationToken cancellationToken)
    {
        return await mediator.Send(new UserUpdateCommand(id, user), cancellationToken);
    }
}