using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("system")]
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