using Core.Cqrs;
using Core.Database;
using Domain.Posts.Dto;
using Domain.Posts.Entities;
using Domain.Posts.Repositories;
using Domain.Users.Services;
using MediatR;
using System.Text;

namespace Domain.Posts.Commands;

public record CreatePostCommand(PostParams Input) : ICommand<Unit>;

internal class CreatePostCommandHandler(
    IPostRepository postRepository,
    IUnitOfWork unitOfWork,
    IUserContextService context
) : ICommandHandler<CreatePostCommand, Unit>
{
    public async Task<Unit> Handle(CreatePostCommand request, CancellationToken cancellationToken)
    {
        var post = new Post(
            request.Input.Title,
            Encoding.UTF8.GetBytes(request.Input.Content),
            context.GetUserId()!.Value);

        postRepository.Add(post);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}