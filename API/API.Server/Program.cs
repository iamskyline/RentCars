using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RentCars.Domain.Services.RentalRequests;
using RentCars.Domain.Services.Users;
using RentCars.Domain.Services.Vehicles;
using RentCars.Services.RentalRequests;
using RentCars.Services.RentalRequests.Repositories;
using RentCars.Services.Users;
using RentCars.Services.Users.Repositories;
using RentCars.Services.Vehicles;
using RentCars.Services.Vehicles.Repositories;
using RentCars.Tools.DataBase;
using RentCars.Tools.JWT;
using Microsoft.AspNetCore.Hosting;

namespace API.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddControllers();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                builder => builder
                .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            builder.Services.AddSingleton<IMainConnector>(new MainConnector(builder.Configuration.GetConnectionString("Main")!));

            #region Repositories

            builder.Services.AddSingleton<IVehicleRepository, VehicleRepository>();
            builder.Services.AddSingleton<IUserRepository, UserRepository>();
            builder.Services.AddSingleton<IRentalRequestRepository, RentalRequestRepository>();

            #endregion

            #region Services

            builder.Services.AddSingleton<IVehicleService, VehicleService>();
            builder.Services.AddSingleton<IUserService, UserService>();
            builder.Services.AddSingleton<IRentalRequestService, RentalRequestService>();

            #endregion

            //Подключение аутентификации
            String? secretKey = builder.Configuration.GetSection("JWTSettings:SecretKey").Value;
            String? issuer = builder.Configuration.GetSection("JWTSettings:Issuer").Value;
            String? audience = builder.Configuration.GetSection("JWTSettings:Audience").Value;
            SymmetricSecurityKey signingKey = JwtTools.FormSigningKey(secretKey!);

            builder.Services.AddAuthorization();
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

            var app = builder.Build();

            app.UseCors("CorsPolicy");
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
