namespace Core.Configuration.Config.Azure;

public interface IAzureConfig
{
    string StorageConnectionString { get; }
    string BlobContainerName { get; }
}