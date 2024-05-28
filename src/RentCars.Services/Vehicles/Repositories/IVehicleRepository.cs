using RentCars.Domain.Vehicles;

namespace RentCars.Services.Vehicles.Repositories;

public interface IVehicleRepository
{
    void SaveVehicle(Vehicle vehicle);

    Vehicle? GetVehicle(Guid vehicleId);
    Vehicle[] GetAllVehicles();
    Vehicle[] GetVehicles(Guid[] ids);

    void RemoveVehicle(Guid vehicleId);
}