using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("")]
public class MainController
{
    [HttpGet]
    [Route("info")]
    public Task getInfo()
    {
        return Task.CompletedTask;
    }
}