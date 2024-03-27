using RentCars.Domain.RentalRequests.Enums;

namespace RentCars.Domain.RentalRequests;

public class RentalRequest
{
    public Guid Id { get; }
    public Guid UserId { get; }
    public Guid VehicleId { get; }
    public DateTime RentalStartDateTimeUtc { get; }
    public DateTime RentalEndDateTimeUtc { get; }
    public RentalStatus Status { get; }

    public RentalRequest(
        Guid id, Guid userId, Guid vehicleId,
        DateTime rentalStartDateTimeUtc, DateTime rentalEndDateTimeUtc,
        RentalStatus status
    )
    {
        Id = id;
        UserId = userId;
        VehicleId = vehicleId;
        RentalStartDateTimeUtc = rentalStartDateTimeUtc;
        RentalEndDateTimeUtc = rentalEndDateTimeUtc;
        Status = status;
    }
}