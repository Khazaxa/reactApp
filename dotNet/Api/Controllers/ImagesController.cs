using Domain.Images.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("images")]
public class ImagesController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("upload")]
    public async Task<Unit> UploadImage(IFormFile file, CancellationToken cancellationToken)
        => await mediator.Send(new ImageUploadCommand(file), cancellationToken);
}