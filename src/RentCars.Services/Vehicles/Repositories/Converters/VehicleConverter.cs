using RentCars.Domain.Vehicles;
using RentCars.Services.Vehicles.Repositories.Models;

namespace RentCars.Services.Vehicles.Repositories.Converters;

public static class VehicleConverter
{
    public static Vehicle ToVehicle(this VehicleDb vehicleDb)
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
            vehicleDb.FourteenAndMoreDaysCost, vehicleDb.MainPhotoPath,
            vehicleDb.PhotoPaths
        );
    }

    public static Vehicle[] ToVehicles(this IEnumerable<VehicleDb> vehicleDbs)
    {
        return vehicleDbs.Select(v => v.ToVehicle()).ToArray();
    }
}