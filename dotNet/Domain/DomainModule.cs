using System.Reflection;
using Autofac;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Module = Autofac.Module;
using MediatR.Extensions.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection.Builder;

namespace Domain;

public class DomainModule(IConfigurationRoot _configuration) : Module
{
    public const string ConnectionStringName = nameof(ImgAppDbContext);

    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
    
        builder.RegisterInstance(_configuration).As<IConfigurationRoot>();
        builder.RegisterModule<Users.UsersModule>();
        builder.RegisterModule<Authentication.AuthModule>();
        builder.RegisterModule<Images.ImagesModule>();
       
        builder.RegisterType<Core.Database.UnitOfWork>().As<Core.Database.IUnitOfWork>().InstancePerLifetimeScope();
        
        RegisterDatabaseProviders(builder);
        RegisterMediator(builder);
    }
    
    public static void MigrateDatabase(IServiceScope scope)
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ImgAppDbContext>();
        dbContext.Database.Migrate();
    }
    
    private void RegisterDatabaseProviders(ContainerBuilder builder)
    {
        builder
            .Register(x =>
            {
                var optionsBuilder = new DbContextOptionsBuilder<ImgAppDbContext>();
                var connectionString = _configuration.GetConnectionString(ConnectionStringName);
                optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
                return new ImgAppDbContext(optionsBuilder.Options);
            })
            .As<DbContext>()
            .AsSelf()
            .InstancePerDependency();
    }
    
    private static void RegisterMediator(ContainerBuilder builder)
    {
        var mediatorConfiguration = MediatRConfigurationBuilder
            .Create(Assembly.GetExecutingAssembly())
            .WithAllOpenGenericHandlerTypesRegistered()
            .WithRegistrationScope(RegistrationScope.Scoped)
            .Build();

        builder.RegisterMediatR(mediatorConfiguration);
    }
}

