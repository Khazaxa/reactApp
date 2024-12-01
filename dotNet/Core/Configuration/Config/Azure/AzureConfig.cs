namespace Core.Configuration.Config.Azure;

public class AzureConfig : IAzureConfig
{
    public string StorageConnectionString { get; set; }
    public string BlobContainerName { get; set; }
}