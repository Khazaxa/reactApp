using Domain.Folders.Commands;
using Domain.Folders.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("")]
public class FoldersController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("folder")]
    public async Task<Unit> CreateFolder(FolderDto folder, CancellationToken cancellationToken)
        => await mediator.Send(new CreateFolderCommand(folder), cancellationToken);

}