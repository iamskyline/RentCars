using RentCars.Domain.RentalRequests;
using RentCars.Tools.Results;

namespace RentCars.Services.RentalRequests.Repositories;

public interface IRentalRequestRepository
{
    void SaveRentalRequest(RentalRequest rentalRequest);

    RentalRequest? GetRentalRequest(Guid rentalRequestId);
    RentalRequest[] GetAllRentalRequests();

    Result RemoveRentalRequest(Guid rentalRequestId);
}