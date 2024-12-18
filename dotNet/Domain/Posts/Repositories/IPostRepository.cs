using Core.Database;
using Domain.Posts.Entities;

namespace Domain.Posts.Repositories;

public interface IPostRepository : IEntityRepository<Post>
{
    
}