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
    [Route("user")]
    public async Task<Unit> UpdateUser(UserParams user, CancellationToken cancellationToken)
    {
        return await mediator.Send(new UserUpdateCommand(user), cancellationToken);
    }
    
    [HttpGet]
    [Route("user/{name}")]
    public async Task<UserDto> GetUser(string name, CancellationToken cancellationToken)
    {
        return await mediator.Send(new UserGetQuery(name), cancellationToken);
    }

    [HttpGet]
    [Route("userById/{id}")]
    public async Task<UserDto> GetUserById(int id, CancellationToken cancellationToken)
    {
        return await mediator.Send(new UserGetByIdQuery(id), cancellationToken);
    }
}