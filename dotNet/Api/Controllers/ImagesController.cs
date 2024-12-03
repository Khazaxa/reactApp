using Domain.Images.Commands;
using Domain.Images.Dtos;
using Domain.Images.Queries;
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
    
    [HttpGet]
    [Route("")]
    public async Task<IEnumerable<ImageDto>> GetImages(CancellationToken cancellationToken)
        => await mediator.Send(new ImagesGetQuery(), cancellationToken);
}