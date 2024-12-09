using Core.Cqrs;
using Domain.Users.Dtos;
using Domain.Users.Repositories;

namespace Domain.Users.Queries;

public record UsersGetQuery : IQuery<IQueryable<UserDto>>;

internal class UsersGetQueryHandler(IUserRepository userRepository) : IQueryHandler<UsersGetQuery, IQueryable<UserDto>>
{
    public Task<IQueryable<UserDto>> Handle(UsersGetQuery query, CancellationToken cancellationToken)
    {
        var users = userRepository.Query()
            .Select(x => new UserDto(
                x.Name,
                x.Email,
                x.Age,
                x.Role
            ));

        return Task.FromResult(users);
    }
}