using Core.Database;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Users.Repositories;

internal class UserRepository(
    IUnitOfWork unitOfWork, 
    SocialMediaDbContext dbContext
) : EntityRepositoryBase<User>(unitOfWork), IUserRepository
{
    public IQueryable<User> Query()
        => dbContext.Users;
    
    public async Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Email == email, cancellationToken);
        return user ?? null;
    }

    public async Task<User?> FindByNameAsync(string name, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Name == name, cancellationToken);
        return user ?? null;
    }

    protected override IQueryable<User> GetQuery()
    {
        return Query().AsQueryable();
    }
}