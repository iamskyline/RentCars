using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.RentalRequests;
using RentCars.Domain.Services.RentalRequests;
using RentCars.Tools.Results;

namespace RentCars.WebAPI.Controllers;

public class RentalRequestController
{
    private readonly IRentalRequestService _rentalRequestService;

    public RentalRequestController(IRentalRequestService rentalRequestService)
    {
        _rentalRequestService = rentalRequestService;
    }

    [HttpPost("api/rental-request/create")]
    public Result SaveRentalRequest([FromBody] RentalRequestBlank blank)
    {
        return _rentalRequestService.SaveRentalRequest(blank);
    }

    [HttpGet("api/rental-request/get-by-id")]
    public RentalRequest? GetRentalRequestById(Guid id)
    {
        return _rentalRequestService.GetRentalRequest(id);
    }

    [HttpGet("api/rental-request/get-all-rental-requests")]
    public RentalRequest[] GetAllRentalRequests()
    {
        return _rentalRequestService.GetAllRentalRequests();
    }

    [HttpPost("api/rental-request/remove")]
    public void RemoveRentalRequest(Guid id)
    {
        _rentalRequestService.RemoveRentalRequest(id);
    }
}