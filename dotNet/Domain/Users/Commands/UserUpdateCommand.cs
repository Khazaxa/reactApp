using Core.Cqrs;
using Core.Database;
using Core.Exceptions;
using Domain.Users.Dtos;
using Domain.Users.Enums;
using Domain.Users.Repositories;
using MediatR;

namespace Domain.Users.Commands;

public record UserUpdateCommand(int Id, UserParams UserParams) : ICommand<Unit>;

internal class UserUpdateCommandHandler(
    IUserRepository userRepository,
    IUnitOfWork unitOfWork
) : ICommandHandler<UserUpdateCommand, Unit>
{
    public async Task<Unit> Handle(UserUpdateCommand command, CancellationToken cancellationToken)
    {
        var user = await userRepository.FindAsync(command.Id, cancellationToken)
                   ?? throw new DomainException("User not found", (int)UserErrorCode.UserNotFound);

        user.Update(
            command.UserParams.Name,
            command.UserParams.Email,
            command.UserParams.Age
        );

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}