using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Folders.Enums;
using Domain.Folders.Repositories;
using MediatR;

namespace Domain.Folders.Commands;

public record DeleteFolderCommand(int Id) : ICommand<Unit>;

internal class DeleteFolderCommandHandler(
    IFolderRepository folderRepository,
    IUnitOfWork unitOfWork
) : ICommandHandler<DeleteFolderCommand, Unit>
{
    public async Task<Unit> Handle(DeleteFolderCommand command, CancellationToken cancellationToken)
    {
        var folder = await folderRepository.FindAsync(command.Id, cancellationToken)
                    ?? throw new DomainException("Folder not found", (int)FolderErrorCode.FolderNotFound);

        folderRepository.Delete(folder);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return await Unit.Task;
    }
}