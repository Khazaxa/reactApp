using Autofac;

namespace Domain.Posts;

public class PostsModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
    
        builder.RegisterType<Repositories.PostRepository>().AsImplementedInterfaces();
        builder.RegisterType<Services.PostService>().AsImplementedInterfaces();
    }
}