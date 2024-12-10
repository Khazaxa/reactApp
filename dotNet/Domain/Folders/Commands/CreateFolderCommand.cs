using Core.Cqrs;
using Core.Database;
using Domain.Folders.Dtos;
using Domain.Folders.Entities;
using Domain.Folders.Repositories;
using Domain.Users.Services;
using MediatR;

namespace Domain.Folders.Commands;

public record CreateFolderCommand(FolderDto Folder) : ICommand<Unit>;

internal class CreateFolderCommandHandler(
    IFolderRepository folderRepository,
    IUserContextService userContext,
    IUnitOfWork unitOfWork
    ) : ICommandHandler<CreateFolderCommand, Unit>
{
    public async Task<Unit> Handle(CreateFolderCommand command, CancellationToken cancellationToken)
    {
        var folder = new Folder(
            command.Folder.Name,
            userContext.GetUserId()            
            );
        
        folderRepository.Add(folder);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return await Unit.Task;
    }
}