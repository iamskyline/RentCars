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
            new("p_id", vehicle.Id),
            new("p_brand", vehicle.Brand),
            new("p_model", vehicle.Model),
            new("p_vehicleclass", (Int32)vehicle.VehicleClass),
            new("p_bodycolor", vehicle.BodyColor),
            new("p_bodytype", (Int32)vehicle.BodyType),
            new("p_enginepower", vehicle.EnginePower),
            new("p_enginecapacity", vehicle.EngineCapacity),
            new("p_fueltype", (Int32)vehicle.FuelType),
            new("p_wheeldrive", (Int32)vehicle.WheelDrive),
            new("p_transmissiontype", (Int32)vehicle.TransmissionType),
            new("p_daycost", vehicle.DayCost),
            new("p_twofourdayscost", vehicle.TwoFourDaysCost),
            new("p_foursevendayscost", vehicle.FourSevenDaysCost),
            new("p_sevenfourteendayscost", vehicle.SevenFourteenDaysCost),
            new("p_fourteenandmoredayscost", vehicle.FourteenAndMoreDaysCost),
            new("p_mainphoto", vehicle.MainPhoto),
            new("p_photos", vehicle.Photos),
            new("p_isremoved", defaultIsRemovedValue),
            new("p_createddatetimeutc", dateTimeNowUtc),
            new("p_yearofmanufacture", vehicle.YearOfManufacture),
            new("p_modifieddatetimeutc", dateTimeNowUtc)
        };

        String query = "INSERT INTO vehicles (id, brand, model, vehicleclass, bodycolor, " +
                       "bodytype, enginepower, enginecapacity, fueltype, wheeldrive, " +
                       "daycost, twofourdayscost, foursevendayscost, sevenfourteendayscost, " +
                       "fourteenandmoredayscost, mainphoto, photos, isremoved, " +
                       "createddatetimeutc, yearofmanufacture, transmissiontype) " +
                       "VALUES (@p_id, @p_brand, @p_model, @p_vehicleclass, @p_bodycolor, @p_bodytype, " +
                       "@p_enginepower, @p_enginecapacity, @p_fueltype, @p_wheeldrive, @p_daycost, " +
                       "@p_twofourdayscost, @p_foursevendayscost, @p_sevenfourteendayscost, " +
                       "@p_fourteenandmoredayscost, @p_mainphoto, @p_photos, @p_isremoved, " +
                       "@p_createddatetimeutc, @p_yearofmanufacture, @p_transmissiontype)" +
                       "ON CONFLICT (id) DO UPDATE SET " +
                       "id = @p_id, brand = @p_brand, model = @p_model, vehicleclass = @p_vehicleclass," +
                       "bodycolor = @p_bodycolor, bodytype = @p_bodytype, enginepower = @p_enginepower, " +
                       "enginecapacity = @p_enginecapacity, fueltype = @p_fueltype, wheeldrive = @p_wheeldrive, " +
                       "daycost = @p_daycost, twofourdayscost = @p_twofourdayscost, " +
                       "foursevendayscost = @p_foursevendayscost, sevenfourteendayscost = @p_sevenfourteendayscost, " +
                       "fourteenandmoredayscost = @p_fourteenandmoredayscost, mainphoto = @p_mainphoto, " +
                       "photos = @p_photos, isremoved = @p_isremoved, " +
                       "yearofmanufacture = @p_yearofmanufacture, transmissiontype = @p_transmissiontype," +
                       "modifieddatetimeutc = @p_modifieddatetimeutc";

        _mainConnector.ExecuteNonQuery(query, parameters);
    }

    public Vehicle? GetVehicle(Guid vehicleId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", vehicleId)
        };

        return _mainConnector.Get<VehicleDb?>(
            expression:"SELECT * FROM vehicles WHERE id = @p_id AND isRemoved = false",
            parameters
        )?.ToVehicle();
    }

    public Vehicle[] GetAllVehicles()
    {
        return _mainConnector.GetList<VehicleDb>("SELECT * FROM vehicles").ToVehicles();
    }

    public Vehicle[] GetVehicles(Guid[] ids)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_ids", ids)
        };

        return _mainConnector.GetList<VehicleDb>("SELECT * FROM vehicles where id = ANY(@p_ids)", parameters).ToVehicles();
    }

    public void RemoveVehicle(Guid vehicleId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", vehicleId)
        };

        _mainConnector.ExecuteNonQuery(
            expression: "UPDATE vehicles SET isRemoved = true WHERE id = @p_id",
            parameters
        );
    }
}