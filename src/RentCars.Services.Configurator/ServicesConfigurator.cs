using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

namespace RentCars.Services.Configurator;

public static class ServicesConfigurator
{
    public static void Initialize(this IServiceCollection services, String environment)
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile($"appsettings.{environment}.json", optional: false)
            .Build();

        services.AddSingleton<IMainConnector>(new MainConnector(configuration.GetConnectionString("Main")!));

        #region Repositories

        services.AddSingleton<IVehicleRepository, VehicleRepository>();
        services.AddSingleton<IUserRepository, UserRepository>();
        services.AddSingleton<IRentalRequestRepository, RentalRequestRepository>();

        #endregion

        #region Services

        services.AddSingleton<IVehicleService, VehicleService>();
        services.AddSingleton<IUserService, UserService>();
        services.AddSingleton<IRentalRequestService, RentalRequestService>();

        #endregion
    }
}