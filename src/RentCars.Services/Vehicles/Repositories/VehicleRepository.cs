using Npgsql;
using RentCars.Domain.Vehicles;
using RentCars.Services.Vehicles.Repositories.Converters;
using RentCars.Services.Vehicles.Repositories.Models;
using RentCars.Tools.DataBase;

namespace RentCars.Services.Vehicles.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly IMainConnector _mainConnector;

    public VehicleRepository(IMainConnector mainConnector)
    {
        _mainConnector = mainConnector;
    }

    public void SaveVehicle(Vehicle vehicle)
    {
        DateTime dateTimeNowUtc = DateTime.UtcNow;
        Boolean defaultIsRemovedValue = false;

        NpgsqlParameter[] parameters =
        {
            new("v_id", vehicle.Id),
            new("v_brand", vehicle.Brand),
            new("v_model", vehicle.Model),
            new("v_vehicleclass", (Int32)vehicle.VehicleClass),
            new("v_bodycolor", vehicle.BodyColor),
            new("v_bodytype", (Int32)vehicle.BodyType),
            new("v_enginepower", vehicle.EnginePower),
            new("v_enginecapacity", vehicle.EngineCapacity),
            new("v_fueltype", (Int32)vehicle.FuelType),
            new("v_wheeldrive", (Int32)vehicle.WheelDrive),
            new("v_transmissiontype", (Int32)vehicle.TransmissionType),
            new("v_daycost", vehicle.DayCost),
            new("v_twofourdayscost", vehicle.TwoFourDaysCost),
            new("v_foursevendayscost", vehicle.FourSevenDaysCost),
            new("v_sevenfourteendayscost", vehicle.SevenFourteenDaysCost),
            new("v_fourteenandmoredayscost", vehicle.FourteenAndMoreDaysCost),
            new("v_mainphoto", vehicle.MainPhotoPath),
            new("v_photos", vehicle.PhotoPaths),
            new("v_isremoved", defaultIsRemovedValue),
            new("v_createddatetimeutc", dateTimeNowUtc),
            new("v_yearofmanufacture", vehicle.YearOfManufacture),
        };

        String query = "INSERT INTO vehicles (id, brand, model, vehicleclass, bodycolor, " +
                       "bodytype, enginepower, enginecapacity, fueltype, wheeldrive, " +
                       "daycost, twofourdayscost, foursevendayscost, sevenfourteendayscost, " +
                       "fourteenandmoredayscost, mainphoto, photos, isremoved, " +
                       "createddatetimeutc, yearofmanufacture, transmissiontype) " +
                       "VALUES (@v_id, @v_brand, @v_model, @v_vehicleclass, @v_bodycolor, @v_bodytype, " +
                       "@v_enginepower, @v_enginecapacity, @v_fueltype, @v_wheeldrive, @v_daycost, " +
                       "@v_twofourdayscost, @v_foursevendayscost, @v_sevenfourteendayscost, " +
                       "@v_fourteenandmoredayscost, @v_mainphoto, @v_photos, @v_isremoved, " +
                       "@v_createddatetimeutc, @v_yearofmanufacture, @v_transmissiontype)";

        _mainConnector.ExecuteNonQuery(query, parameters);
    }

    public Vehicle? GetVehicle(Guid vehicleId)
    {
        NpgsqlParameter[] parameters =
        {
            new("v_id", vehicleId)
        };

        return _mainConnector.Get<VehicleDb?>(
            expression:"SELECT * FROM vehicles WHERE id = @v_id AND isRemoved = false",
            parameters
        )?.ToVehicle();
    }

    public Vehicle[] GetAllVehicles()
    {
        return _mainConnector.GetList<VehicleDb>("SELECT * FROM vehicles").ToVehicles();
    }

    public void RemoveVehicle(Guid vehicleId)
    {
        NpgsqlParameter[] parameters =
        {
            new("v_id", vehicleId)
        };

        _mainConnector.ExecuteNonQuery(
            expression: "UPDATE vehicles SET isRemoved = true WHERE id = @v_id",
            parameters
        );
    }
}