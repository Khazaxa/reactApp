using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("")]
public class MainController(IMediator mediator)
{
    [HttpGet]
    [Route("info")]
    public Task getInfo()
    {
        return Task.CompletedTask;
    }
}