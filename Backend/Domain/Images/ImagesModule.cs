using Autofac;

namespace Domain.Images;

public class ImagesModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
    
        builder.RegisterType<Repositories.ImageRepository>().AsImplementedInterfaces();
        builder.RegisterType<Services.ImageService>().AsImplementedInterfaces();
    }
}