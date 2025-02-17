using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Folders.Enums;
using Domain.Folders.Repositories;
using Domain.Images.Enums;
using Domain.Images.Repositories;
using MediatR;

namespace Domain.Images.Commands;

public record ImagesAssignCommand(List<int> Ids, int FolderId) : ICommand<Unit>;

internal class ImagesAssignCommandHandler(
    IImageRepository imageRepository,
    IFolderRepository folderRepository,
    IUnitOfWork unitOfWork
) : ICommandHandler<ImagesAssignCommand, Unit>
{
    public async Task<Unit> Handle(ImagesAssignCommand command, CancellationToken cancellationToken)
    {
        var folder = await folderRepository.FindAsync(command.FolderId, cancellationToken)
                     ?? throw new DomainException("Folder not found", (int)FolderErrorCode.FolderNotFound);

        var images = await imageRepository.FindAsync(command.Ids, cancellationToken);
        if (!images.Any())
            throw new DomainException("No image found", (int)ImageErrorCode.ImageNotFound);
        
        foreach (var image in images)
        {
            image.UpdateFolderId(folder.Id);
            imageRepository.Update(image);
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}
