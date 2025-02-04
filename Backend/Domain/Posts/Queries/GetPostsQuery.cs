using Core.Cqrs;
using Domain.Posts.Dto;
using Domain.Posts.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Domain.Posts.Queries;

public record GetPostsQuery : IQuery<IEnumerable<PostDto>>;

internal class GetPostsQueryHandler(
    IPostRepository postRepository
) : IQueryHandler<GetPostsQuery, IEnumerable<PostDto>>
{
    public async Task<IEnumerable<PostDto>> Handle(GetPostsQuery request, CancellationToken cancellationToken)
    {
        var posts = await postRepository.Query()
            .Include(x => x.Author)
            .Select(i => new PostDto(i.Id, i.Title, Encoding.UTF8.GetString(i.Content), i.Author.Id, i.Author.Name))
            .ToListAsync(cancellationToken);
        return posts;
    }
}