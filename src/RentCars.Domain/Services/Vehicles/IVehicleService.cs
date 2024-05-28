using RentCars.Domain.Vehicles;
using RentCars.Tools.Results;

namespace RentCars.Domain.Services.Vehicles;

public interface IVehicleService
{
    Result SaveVehicle(VehicleBlank blank);

    Vehicle? GetVehicle(Guid vehicleId);
    Vehicle[] GetAllVehicles();
    Vehicle[] GetVehicles(Guid[] ids);

    void RemoveVehicle(Guid vehicleId);
}