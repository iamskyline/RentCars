using RentCars.Domain.Vehicles;
using RentCars.Tools.Results;

namespace RentCars.Services.Vehicles.Repositories;

public interface IVehicleRepository
{
    DataResult<Guid> SaveVehicle(VehicleBlank vehicle);
    Result SaveVehiclePhoto(VehiclePhotoBlank blank);

    Vehicle? GetVehicle(Guid vehicleId);
    Vehicle[] GetAllVehicles();
    Vehicle[] GetVehicles(Guid[] ids);

    Result RemoveVehicle(Guid vehicleId);
    void DeletePhotos(Guid[] ids);
}