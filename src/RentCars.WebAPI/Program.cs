using RentCars.Services.Configurator;
using System;

namespace RentCars.WebAPI;

public class Program
{
    public static void Main(String[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.Initialize(builder.Environment.EnvironmentName);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                builder => builder
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .SetIsOriginAllowed((host) => true)
                    .AllowAnyHeader());
        });

        WebApplication app = builder.Build();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        //app.UseStaticFiles();

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();
        app.UseCors("CorsPolicy");
        app.Run();
    }
}