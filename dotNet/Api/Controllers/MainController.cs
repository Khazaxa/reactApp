using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("test")]
public class MainController(IMediator mediator)
{
    [HttpGet]
    [Route("info")]
    [Authorize(Roles = "Admin")]
    public Task getInfo()
    {
        return Task.CompletedTask;
    }
}