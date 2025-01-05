using Domain.Comments.Commands;
using Domain.Comments.Dto;
using Domain.Comments.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("")]
public class CommentsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("comment")]
    public async Task<Unit> CreateComment(CommentParams commentParams, CancellationToken cancellationToken)
        => await mediator.Send(new CreateCommentCommand(commentParams), cancellationToken);
    
    [HttpGet]
    [Route("comments")]
    public async Task<IEnumerable<CommentDto>> GetComments(CancellationToken cancellationToken)
        => await mediator.Send(new GetCommentsQuery(), cancellationToken);
}