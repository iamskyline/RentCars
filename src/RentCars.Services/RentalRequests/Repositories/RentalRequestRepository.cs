using Npgsql;
using RentCars.Domain.RentalRequests;
using RentCars.Services.RentalRequests.Repositories.Converters;
using RentCars.Services.RentalRequests.Repositories.Models;
using RentCars.Tools.DataBase;

namespace RentCars.Services.RentalRequests.Repositories;

public class RentalRequestRepository : IRentalRequestRepository
{
    private readonly IMainConnector _mainConnector;

    public RentalRequestRepository(IMainConnector mainConnector)
    {
        _mainConnector = mainConnector;
    }

    public void SaveRentalRequest(RentalRequest rentalRequest)
    {
        DateTime dateTimeNowUtc = DateTime.UtcNow;
        Boolean defaultIsRemovedValue = false;

        NpgsqlParameter[] parameters =
        {
            new("p_id", rentalRequest.Id),
            new("p_userid", rentalRequest.UserId),
            new("p_vehicleid", rentalRequest.VehicleId),
            new("p_rentalstartdatetimeutc", rentalRequest.RentalStartDateTimeUtc),
            new("p_rentalenddatetimeutc", rentalRequest.RentalEndDateTimeUtc),
            new("p_status", (Int32)rentalRequest.Status),
            new("p_isremoved", defaultIsRemovedValue),
            new("p_createddatetimeutc", dateTimeNowUtc),
            new("p_modifieddatetimeutc", dateTimeNowUtc)
        };

        String query = "INSERT INTO rentalrequests (id, userid, vehicleid, rentalstartdatetimeutc, " +
                       "rentalenddatetimeutc, status, isremoved, createddatetimeutc) " +
                       "VALUES (@p_id, @p_userid, @p_vehicleid, @p_rentalstartdatetimeutc, " +
                       "@p_rentalenddatetimeutc, @p_status, @p_isremoved, @p_createddatetimeutc)" +
                       "ON CONFLICT (id) DO UPDATE SET " +
                       "id = @p_id, userid = @p_userid, vehicleid = @p_vehicleid," +
                       "rentalstartdatetimeutc = @p_rentalstartdatetimeutc," +
                       "rentalenddatetimeutc = @p_rentalenddatetimeutc, status = @p_status," +
                       "isremoved = @p_isremoved, modifieddatetimeutc = @p_modifieddatetimeutc";

        _mainConnector.ExecuteNonQuery(query, parameters);
    }

    public RentalRequest? GetRentalRequest(Guid rentalRequestId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", rentalRequestId)
        };

        return _mainConnector.Get<RentalRequestDb?>(
            expression: "SELECT * FROM rentalrequests WHERE id = @p_id",
            parameters
        )?.ToRentalRequest();
    }

    public RentalRequest[] GetAllRentalRequests()
    {
        return _mainConnector.GetList<RentalRequestDb>("SELECT * FROM rentalrequests").ToRentalRequest();
    }

    public void RemoveRentalRequest(Guid rentalRequestId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", rentalRequestId)
        };

        _mainConnector.ExecuteNonQuery(
            expression: "UPDATE rentalrequests SET isRemoved = true WHERE id = @p_id",
            parameters
        );
    }
}