namespace Core.Exceptions;

public class DomainException : Exception
{
    public DomainException(string message, int errorCode): base(message)
    {
        ErrorCode = errorCode;
    }

    public int ErrorCode { get; }
}