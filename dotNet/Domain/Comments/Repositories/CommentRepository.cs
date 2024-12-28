using Core.Database;
using Domain.Comments.Entities;

namespace Domain.Comments.Repositories;

internal class CommentRepository(IUnitOfWork unitOfWork,
    ImgAppDbContext dbContext) : EntityRepositoryBase<Comment>(unitOfWork), ICommentRepository
{
    protected override IQueryable<Comment> GetQuery()
    => dbContext.Comments.AsQueryable();

    public IQueryable<Comment> Query()
        => dbContext.Comments.AsQueryable();
}