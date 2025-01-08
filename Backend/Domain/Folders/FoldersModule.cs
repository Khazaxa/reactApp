using Autofac;

namespace Domain.Folders;

public class FoldersModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
    
        builder.RegisterType<Repositories.FolderRepository>().AsImplementedInterfaces();
        builder.RegisterType<Services.FolderService>().AsImplementedInterfaces();
    }
}