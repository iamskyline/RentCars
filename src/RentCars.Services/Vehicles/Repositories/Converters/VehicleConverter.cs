using RentCars.Domain.Vehicles;
using RentCars.Services.Vehicles.Repositories.Models;

namespace RentCars.Services.Vehicles.Repositories.Converters;

public static class VehicleConverter
{
    public static Vehicle ToVehicle(this VehicleDb vehicleDb, VehiclePhotoDb[] photoDbs)
    {
        return new Vehicle(
            vehicleDb.Id, vehicleDb.Brand, vehicleDb.Model,
            vehicleDb.YearOfManufacture, vehicleDb.VehicleClass,
            vehicleDb.BodyColor, vehicleDb.BodyType,
            vehicleDb.EnginePower, vehicleDb.EngineCapacity,
            vehicleDb.FuelType, vehicleDb.WheelDrive,
            vehicleDb.TransmissionType,
            vehicleDb.DayCost, vehicleDb.TwoFourDaysCost,
            vehicleDb.FourSevenDaysCost, vehicleDb.SevenFourteenDaysCost,
            vehicleDb.FourteenAndMoreDaysCost,
            photoDbs.ToPhotos()
        );
    }

    public static Vehicle[] ToVehicles(this IEnumerable<VehicleDb> vehicleDbs, VehiclePhotoDb[] photoDbs)
    {
        return vehicleDbs.Select(v => v.ToVehicle(photoDbs.Where(ph => ph.VehicleId == v.Id).ToArray())).ToArray();
    }

    public static VehiclePhoto[] ToPhotos(this VehiclePhotoDb[] photoDbs)
    {
        return photoDbs.Select(ph => new VehiclePhoto(ph.Id, ph.VehicleId, ph.Path)).ToArray();
    }
}