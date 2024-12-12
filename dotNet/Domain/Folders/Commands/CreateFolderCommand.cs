using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Folders.Dtos;
using Domain.Folders.Entities;
using Domain.Folders.Enums;
using Domain.Folders.Repositories;
using Domain.Users.Enums;
using Domain.Users.Services;
using MediatR;

namespace Domain.Folders.Commands;

public record CreateFolderCommand(FolderParams Folder) : ICommand<Unit>;

internal class CreateFolderCommandHandler(
    IFolderRepository folderRepository,
    IUserContextService userContext,
    IUnitOfWork unitOfWork
) : ICommandHandler<CreateFolderCommand, Unit>
{
    public async Task<Unit> Handle(CreateFolderCommand command, CancellationToken cancellationToken)
    {
        if (await folderRepository.AnyAsync(f => f.Name == command.Folder.Name, cancellationToken))
            throw new DomainException("Folder already exists", (int)FolderErrorCode.FolderExists);

        var folder = new Folder(
            command.Folder.Name,
            userContext.GetUserId() ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound)
        );

        folderRepository.Add(folder);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return await Unit.Task;
    }
}