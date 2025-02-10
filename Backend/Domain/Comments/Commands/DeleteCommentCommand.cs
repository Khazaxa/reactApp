using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Comments.Enum;
using Domain.Comments.Repositories;
using MediatR;

namespace Domain.Comments.Commands;

public record DeleteCommentCommand(int Id) : ICommand<Unit>;

internal class DeleteCommentCommandHandler(
    ICommentRepository commentRepository,
    IUnitOfWork unitOfWork
) : ICommandHandler<DeleteCommentCommand, Unit>
{
    public async Task<Unit> Handle(DeleteCommentCommand command, CancellationToken cancellationToken)
    {
        var comment = await commentRepository.FindAsync(command.Id, cancellationToken)
            ?? throw new DomainException("Comment not found", (int)CommentErrorCode.CommentNotFound);
        
        commentRepository.Delete(comment);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Task.Result;
    }
}