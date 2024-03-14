using RentCars.Domain.RentalRequests;
using RentCars.Tools.Results;

namespace RentCars.Domain.Services.RentalRequests;

public interface IRentalRequestService
{
    Result SaveRentalRequest(RentalRequestBlank blank);

    RentalRequest? GetRentalRequest(Guid rentalRequestId);
    RentalRequest[] GetAllRentalRequests();

    Result RemoveRentalRequest(Guid rentalRequestId);
}