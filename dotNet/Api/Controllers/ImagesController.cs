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
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<Unit> DeleteImage(int id, CancellationToken cancellationToken)
        => await mediator.Send(new ImageDeleteCommand(id), cancellationToken);
    
    [HttpGet]
    [Route("{id}")]
    public async Task<ImageDto> GetImage(int id, CancellationToken cancellationToken)
    => await mediator.Send(new ImageGetQuery(id), cancellationToken);
    
    [HttpGet]
    [Route("user/{folderId}")]
    public async Task<IEnumerable<ImageDto>> GetImagesByFolder(int folderId, CancellationToken cancellationToken)
        => await mediator.Send(new ImagesGetByFolderQuery(folderId), cancellationToken);
}

