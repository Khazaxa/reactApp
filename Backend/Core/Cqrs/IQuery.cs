using MediatR;

namespace Core.Cqrs;

public interface IQuery<T> : IRequest<T> { }