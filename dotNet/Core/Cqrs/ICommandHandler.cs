using MediatR;

namespace Core.Cqrs;

public interface ICommandHandler<T, E> : IRequestHandler<T, E> where T : ICommand<E> { }