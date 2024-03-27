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
            new("r_id", rentalRequest.Id),
            new("r_userid", rentalRequest.UserId),
            new("r_vehicleid", rentalRequest.VehicleId),
            new("r_rentalstartdatetimeutc", rentalRequest.RentalStartDateTimeUtc),
            new("r_rentalenddatetimeutc", rentalRequest.RentalEndDateTimeUtc),
            new("r_status", (Int32)rentalRequest.Status),
            new("r_isremoved", defaultIsRemovedValue),
            new("r_createddatetimeutc", dateTimeNowUtc)
        };

        String query = "INSERT INTO rentalrequests (id, userid, vehicleid, rentalstartdatetimeutc, " +
                       "rentalenddatetimeutc, status, isremoved, createddatetimeutc) " +
                       "VALUES (@r_id, @r_userid, @r_vehicleid, @r_rentalstartdatetimeutc, " +
                       "@r_rentalenddatetimeutc, @r_status, @r_isremoved, @r_createddatetimeutc)";

        _mainConnector.ExecuteNonQuery(query, parameters);
    }

    public RentalRequest? GetRentalRequest(Guid rentalRequestId)
    {
        NpgsqlParameter[] parameters =
        {
            new("r_id", rentalRequestId)
        };

        return _mainConnector.Get<RentalRequestDb?>(
            expression: "SELECT * FROM rentalrequests WHERE id = @r_id",
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
            new("r_id", rentalRequestId)
        };

        _mainConnector.ExecuteNonQuery(
            expression: "UPDATE rentalrequests SET isRemoved = true WHERE id = @r_id",
            parameters
        );
    }
}