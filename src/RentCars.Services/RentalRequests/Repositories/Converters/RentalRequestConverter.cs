using RentCars.Domain.RentalRequests;
using RentCars.Services.RentalRequests.Repositories.Models;

namespace RentCars.Services.RentalRequests.Repositories.Converters;

public static class RentalRequestConverter
{
    public static RentalRequest ToRentalRequest(this RentalRequestDb rentalRequestDb)
    {
        return new RentalRequest(
            rentalRequestDb.Id,
            rentalRequestDb.UserId,
            rentalRequestDb.VehicleId,
            rentalRequestDb.RentalStartDateTimeUtc,
            rentalRequestDb.RentalEndDateTimeUtc,
            rentalRequestDb.Status
        );
    }

    public static RentalRequest[] ToRentalRequest(this IEnumerable<RentalRequestDb> rentalRequestDbs)
    {
        return rentalRequestDbs.Select(r => r.ToRentalRequest()).ToArray();
    }
}