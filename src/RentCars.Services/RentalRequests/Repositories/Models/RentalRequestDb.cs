using RentCars.Domain.RentalRequests.Enums;

namespace RentCars.Services.RentalRequests.Repositories.Models;

public class RentalRequestDb
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid VehicleId { get; set; }
    public DateTime RentalStartDateTimeUtc { get; set; }
    public DateTime RentalEndDateTimeUtc { get; set; }
    public RentalStatus Status { get; set; }
}