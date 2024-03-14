using RentCars.Domain.RentalRequests.Enums;

namespace RentCars.Domain.RentalRequests;

public partial class RentalRequestBlank
{
    public Guid? Id { get; set; }
    public Guid? ClientId { get; set; }
    public Guid? VehicleId { get; set; }
    public DateTime? RentalStartDateTimeUtc { get; set; }
    public DateTime? RentalEndDateTimeUtc { get; set; }
    public RentalStatus? Status { get; set; }
}

public partial class RentalRequestBlank
{
    public class Valid
    {
        public Guid Id { get; }
        public Guid ClientId { get; }
        public Guid VehicleId { get; }
        public DateTime RentalStartDateTimeUtc { get; }
        public DateTime RentalEndDateTimeUtc { get; }
        public RentalStatus Status { get; }

        public Valid(Guid id, Guid clientId,
            Guid vehicleId, DateTime rentalStartDateTimeUtc,
            DateTime rentalEndDateTimeUtc, RentalStatus status
        )
        {
            Id = id;
            ClientId = clientId;
            VehicleId = vehicleId;
            RentalStartDateTimeUtc = rentalStartDateTimeUtc;
            RentalEndDateTimeUtc = rentalEndDateTimeUtc;
            Status = status;
        }
    }
}