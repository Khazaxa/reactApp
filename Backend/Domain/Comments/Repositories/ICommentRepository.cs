using Core.Database;
using Domain.Comments.Entities;

namespace Domain.Comments.Repositories;

public interface ICommentRepository : IEntityRepository<Comment>
{
    IQueryable<Comment> Query();
}