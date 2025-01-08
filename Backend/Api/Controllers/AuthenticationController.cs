using Domain.Authentication.Commands;
using Domain.Authentication.Dto;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("auth")]
public class AuthenticationController(IMediator mediator) : ControllerBase
{
    [HttpPost, Route("register")]
    public async Task<int> Register(RegisterParams registerParams, CancellationToken cancellationToken)
        => await mediator.Send(new RegisterCommand(registerParams), cancellationToken);
    
    [HttpPost, Route("login")]
    public Task<LoginResponse> Login(LoginParams loginParams, CancellationToken cancellationToken)
        => mediator.Send(new LoginCommand(loginParams), cancellationToken);
}