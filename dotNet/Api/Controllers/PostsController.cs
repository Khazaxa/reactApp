using Domain.Posts.Commands;
using Domain.Posts.Dto;
using Domain.Posts.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("")]
public class PostsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("post")]
    public async Task<Unit> CreatePost(PostParams folder, CancellationToken cancellationToken)
        => await mediator.Send(new CreatePostCommand(folder), cancellationToken);
    
    [HttpGet]
    [Route("posts")]
    public async Task<IEnumerable<PostDto>> GetPosts(CancellationToken cancellationToken)
        => await mediator.Send(new GetPostsQuery(), cancellationToken);
}