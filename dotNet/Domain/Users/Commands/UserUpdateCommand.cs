using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Users.Dtos;
using Domain.Users.Enums;
using Domain.Users.Repositories;
using Domain.Users.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Domain.Users.Commands;

public record UserUpdateCommand(UserParams UserParams) : ICommand<Unit>;

internal class UserUpdateCommandHandler(
    IUserRepository userRepository,
    IUserContextService userContext,
    ImgAppDbContext dbContext
) : ICommandHandler<UserUpdateCommand, Unit>
{
    public async Task<Unit> Handle(UserUpdateCommand command, CancellationToken cancellationToken)
    {
        var loggedUserId = userContext.GetUserId();

        var user = await userRepository.FindAsync(loggedUserId!.Value, cancellationToken)
                   ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound);

        var entry = dbContext.Entry(user);
        if (entry.State == EntityState.Detached)
        {
            dbContext.Attach(user);
        }
        dbContext.Entry(user).State = EntityState.Modified;

        user.Update(
            command.UserParams.Name,
            command.UserParams.Age
        );

        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}