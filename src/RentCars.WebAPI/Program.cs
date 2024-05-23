using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using RentCars.Services.Configurator;
using RentCars.Tools.JWT;

namespace RentCars.WebAPI;

public class Program
{
    public static void Main(String[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllersWithViews();
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

        //Подключение аутентификации
        String? secretKey = builder.Configuration.GetSection("JWTSettings:SecretKey").Value;
        String? issuer = builder.Configuration.GetSection("JWTSettings:Issuer").Value;
        String? audience = builder.Configuration.GetSection("JWTSettings:Audience").Value;
        SymmetricSecurityKey signingKey = JwtTools.FormSigningKey(secretKey!);
        
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateAudience = true,
                ValidAudience = audience,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,
                ValidateLifetime = true
            };
        });

        WebApplication app = builder.Build();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        app.UseStaticFiles();

        app.UseHttpsRedirection();

        app.UseRouting();
        app.MapControllers();
        app.UseCors("CorsPolicy");
        app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute());
        app.Run();
    }
}