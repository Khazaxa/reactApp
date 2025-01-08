using MediatR;

namespace Core.Cqrs;

public interface IQueryHandler<T, E> : IRequestHandler<T, E> where T : IQuery<E> { }