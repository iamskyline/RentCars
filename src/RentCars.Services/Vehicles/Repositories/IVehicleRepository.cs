using RentCars.Domain.Vehicles;
using RentCars.Tools.Results;

namespace RentCars.Services.Vehicles.Repositories;

public interface IVehicleRepository
{
    void SaveVehicle(Vehicle vehicle);

    Vehicle? GetVehicle(Guid vehicleId);
    Vehicle[] GetAllVehicles();
    Vehicle[] GetVehicles(Guid[] ids);

    Result RemoveVehicle(Guid vehicleId);
}