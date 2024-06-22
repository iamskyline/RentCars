using Microsoft.AspNetCore.Http;
using RentCars.Domain.Vehicles;
using RentCars.Tools.Results;

namespace RentCars.Domain.Services.Vehicles;

public interface IVehicleService
{
    Result SaveVehicle(VehicleBlank blank, List<IFormFile> photos);

    Vehicle? GetVehicle(Guid vehicleId);
    Vehicle[] GetAllVehicles();
    Vehicle[] GetVehicles(Guid[] ids);

    Result RemoveVehicle(Guid vehicleId);
}