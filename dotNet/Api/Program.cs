using System.Text;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Core.Configuration;
using Core.Configuration.Config;
using Core.Exceptions.Middleware;
using Domain;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddHttpContextAccessor();
        ConfigureDependencyInjection(builder);
        
        builder.Services.AddAuthorization();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "ImgApp API", Version = "v1" });
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter JWT with Bearer into field",
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                    },
                    new string[] { }
                }
            });
        });

        var authenticationSettings = new AuthenticationSettings();
        builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);

        builder.Services.AddSingleton<IAuthenticationSettings>(authenticationSettings);
        builder.Services.AddAuthentication(o =>
        {
            o.DefaultAuthenticateScheme = "Bearer";
            o.DefaultScheme = "Bearer";
            o.DefaultChallengeScheme = "Bearer";
        }).AddJwtBearer(cfg =>
        {
            cfg.RequireHttpsMetadata = false;
            cfg.SaveToken = true;
            cfg.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = authenticationSettings.JwtIssuer,
                ValidAudience = authenticationSettings.JwtIssuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey))
            };
        });
        
        builder.Services.AddControllers();
        var app = builder.Build();

        app.UseMiddleware<ExceptionMiddleware>();
        
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ImgApp API v1");
            });
        }
        
        app.UseAuthentication();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        
        using (var scope = app.Services.CreateScope())
        {
            DomainModule.MigrateDatabase(scope);
        }

        app.Run();
    }

    private static void ConfigureDependencyInjection(WebApplicationBuilder appBuilder)
    {
        appBuilder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
        appBuilder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
        {
            containerBuilder.RegisterModule(new DomainModule(appBuilder.Configuration));
            containerBuilder.RegisterInstance(new AppConfiguration(appBuilder.Configuration))
                .As<IAppConfiguration>().SingleInstance();
        });
    }
}