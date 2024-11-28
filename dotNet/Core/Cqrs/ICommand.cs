using MediatR;

namespace Core.Cqrs;

public interface ICommand<T> : IRequest<T> { }
