using Core.Cqrs;
using Core.Exceptions;
using Domain.Folders.Enums;
using Domain.Folders.Repositories;
using Domain.Images.Entities;
using Domain.Images.Enums;
using Domain.Images.Repositories;
using MediatR;

namespace Domain.Images.Commands;

public record ImagesAssignCommand(List<int> Ids, int FolderId) : ICommand<Unit>;

internal class ImagesAssignCommandHandler(
    IImageRepository imageRepository,
    IFolderRepository folderRepository,
    SocialMediaDbContext dbContext
    ) : ICommandHandler<ImagesAssignCommand,Unit>
{
    public Task<Unit> Handle(ImagesAssignCommand command, CancellationToken cancellationToken)
    {
        var folder = folderRepository.FindAsync(command.FolderId, cancellationToken)
            ?? throw new DomainException("Folder not found", (int)FolderErrorCode.FolderNotFound);
        var images = imageRepository.FindAsync(command.Ids, cancellationToken).Result
            ?? throw new DomainException("No image found", (int)ImageErrorCode.ImageNotFound);
        
        folder.Result.AssignImagesToFolder((List<Image>)images);
        dbContext.SaveChangesAsync(cancellationToken);
        
        return Unit.Task;
    }
}