using Autofac;

namespace Domain.Comments;

public class CommentsModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
    
        builder.RegisterType<Repositories.CommentRepository>().AsImplementedInterfaces();
        builder.RegisterType<Services.CommentService>().AsImplementedInterfaces();
    }
}