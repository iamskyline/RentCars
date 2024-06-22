using Npgsql;
using RentCars.Domain.Vehicles;
using RentCars.Services.Vehicles.Repositories.Converters;
using RentCars.Services.Vehicles.Repositories.Models;
using RentCars.Tools.DataBase;
using RentCars.Tools.Results;

namespace RentCars.Services.Vehicles.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly IMainConnector _mainConnector;

    public VehicleRepository(IMainConnector mainConnector)
    {
        _mainConnector = mainConnector;
    }

    public DataResult<Guid> SaveVehicle(VehicleBlank vehicle)
    {
        DateTime dateTimeNowUtc = DateTime.UtcNow;
        Boolean defaultIsRemovedValue = false;

        Guid vehicleId = vehicle.Id ?? Guid.NewGuid();

        NpgsqlParameter[] parameters =
        {
            new("p_id", vehicleId),
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
            new("p_isremoved", defaultIsRemovedValue),
            new("p_createddatetimeutc", dateTimeNowUtc),
            new("p_yearofmanufacture", vehicle.YearOfManufacture),
            new("p_modifieddatetimeutc", dateTimeNowUtc)
        };

        String query = "INSERT INTO vehicles (id, brand, model, vehicleclass, bodycolor, " +
                       "bodytype, enginepower, enginecapacity, fueltype, wheeldrive, " +
                       "daycost, twofourdayscost, foursevendayscost, sevenfourteendayscost, " +
                       "fourteenandmoredayscost, isremoved, " +
                       "createddatetimeutc, yearofmanufacture, transmissiontype) " +
                       "VALUES (@p_id, @p_brand, @p_model, @p_vehicleclass, @p_bodycolor, @p_bodytype, " +
                       "@p_enginepower, @p_enginecapacity, @p_fueltype, @p_wheeldrive, @p_daycost, " +
                       "@p_twofourdayscost, @p_foursevendayscost, @p_sevenfourteendayscost, " +
                       "@p_fourteenandmoredayscost, @p_isremoved, " +
                       "@p_createddatetimeutc, @p_yearofmanufacture, @p_transmissiontype)" +
                       "ON CONFLICT (id) DO UPDATE SET " +
                       "id = @p_id, brand = @p_brand, model = @p_model, vehicleclass = @p_vehicleclass," +
                       "bodycolor = @p_bodycolor, bodytype = @p_bodytype, enginepower = @p_enginepower, " +
                       "enginecapacity = @p_enginecapacity, fueltype = @p_fueltype, wheeldrive = @p_wheeldrive, " +
                       "daycost = @p_daycost, twofourdayscost = @p_twofourdayscost, " +
                       "foursevendayscost = @p_foursevendayscost, sevenfourteendayscost = @p_sevenfourteendayscost, " +
                       "fourteenandmoredayscost = @p_fourteenandmoredayscost, isremoved = @p_isremoved, " +
                       "yearofmanufacture = @p_yearofmanufacture, transmissiontype = @p_transmissiontype," +
                       "modifieddatetimeutc = @p_modifieddatetimeutc";

        try
        {
            _mainConnector.ExecuteNonQuery(query, parameters);
        }
        catch (Exception e)
        {
            return DataResult<Guid>.Fail($"Не удалось сохранить автомобиль {e.Message}");
        }

        return DataResult<Guid>.Success(vehicleId);
    }

    public Result SaveVehiclePhoto(VehiclePhotoBlank blank)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", blank.Id),
            new("p_vehicleid", blank.VehicleId),
            new("p_path", blank.Path),
        };

        String query = "INSERT INTO vehiclePhotos (id, vehicleid, path) VALUES (@p_id, @p_vehicleid, @p_path)";

        try
        {
            _mainConnector.ExecuteNonQuery(query, parameters);
        }
        catch (Exception e)
        {
            return Result.Fail($"Не удалось сохранить фото {e.Message}");
        }

        return Result.Success();
    }

    public Vehicle? GetVehicle(Guid vehicleId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", vehicleId)
        };

        String query = "SELECT * FROM vehicles WHERE id = @p_id AND isRemoved = false";

        VehicleDb? vehicle = _mainConnector.Get<VehicleDb?>(query, parameters);
        if (vehicle == null) return null;

        VehiclePhotoDb[] photoDbs = GetVehiclePhotos(vehicleId);
        return vehicle?.ToVehicle(photoDbs);
    }

    private VehiclePhotoDb[] GetVehiclePhotos(Guid vehicleId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", vehicleId)
        };

        String query = "SELECT id, vehicleid, path FROM vehiclephotos where vehicleid = @p_id";
        return _mainConnector.GetList<VehiclePhotoDb>(query, parameters).ToArray();
    }

    private VehiclePhotoDb[] GetAllVehiclesPhotos()
    {
        String query = "SELECT id, vehicleid, path FROM vehiclephotos";
        return _mainConnector.GetList<VehiclePhotoDb>(query).ToArray();
    }

    public Vehicle[] GetAllVehicles()
    {
        VehiclePhotoDb[] photoDbs = GetAllVehiclesPhotos();

        return _mainConnector.GetList<VehicleDb>("SELECT * FROM vehicles v " +
            "WHERE NOT v.isRemoved ORDER BY v.createddatetimeutc").ToVehicles(photoDbs);
    }

    public Vehicle[] GetVehicles(Guid[] ids)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_ids", ids)
        };

        VehiclePhotoDb[] photoDbs = GetAllVehiclesPhotos();

        return _mainConnector.GetList<VehicleDb>("SELECT * FROM vehicles where id = ANY(@p_ids)", parameters).ToVehicles(photoDbs);
    }

    public Result RemoveVehicle(Guid vehicleId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", vehicleId)
        };

        try
        {
            _mainConnector.ExecuteNonQuery(
                expression: "UPDATE vehicles SET isRemoved = true WHERE id = @p_id",
                parameters
            );
        }
        catch (Exception e)
        {
            return Result.Fail($"Не удалось удалить автомобиль {e.Message}");
        }

        return Result.Success();
    }

    public void DeletePhotos(Guid[] ids)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_ids", ids)
        };

        try
        {
            _mainConnector.ExecuteNonQuery(
                expression: "DELETE FROM vehiclephotos where id = any(@p_ids)", 
                parameters
            );
        }
        catch (Exception e)
        {
        }
    }
}