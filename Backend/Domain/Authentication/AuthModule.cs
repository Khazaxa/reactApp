using Autofac;

namespace Domain.Authentication;

public class AuthModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
        
        builder.RegisterType<Services.AuthService>().AsImplementedInterfaces();
    }
}