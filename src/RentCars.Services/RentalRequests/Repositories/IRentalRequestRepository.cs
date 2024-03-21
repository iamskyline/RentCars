using RentCars.Domain.RentalRequests;

namespace RentCars.Services.RentalRequests.Repositories;

public interface IRentalRequestRepository
{
    void SaveRentalRequest(RentalRequest rentalRequest);

    RentalRequest? GetRentalRequest(Guid rentalRequestId);
    RentalRequest[] GetAllRentalRequests();

    void RemoveRentalRequest(Guid rentalRequestId);
}