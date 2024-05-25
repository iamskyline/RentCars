using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.RentalRequests;
using RentCars.Domain.Services.RentalRequests;
using RentCars.Tools.Results;
using RentCars.WebAPI.Infrastructure;

namespace RentCars.WebAPI.Controllers;

public class RentalRequestController : BaseController
{
    private readonly IRentalRequestService _rentalRequestService;

    public RentalRequestController(IRentalRequestService rentalRequestService)
    {
        _rentalRequestService = rentalRequestService;
    }

    [HttpGet("/requests")]
    [HttpGet("/request/{rentalId}")]
    public IActionResult ViewRequestsPage()
    {
        return ReactApplication();
    }

    [HttpGet("/request-form")]
    public IActionResult ViewRequestForm()
    {
        return ReactApplication();
    }

    [HttpPost("api/rental-request/create")]
    public Result SaveRentalRequest([FromBody] RentalRequestBlank blank)
    {
        return _rentalRequestService.SaveRentalRequest(blank);
    }

    [HttpGet("api/rental-request/get-by-id")]
    public RentalRequest? GetRentalRequestById(Guid rentalId)
    {
        return _rentalRequestService.GetRentalRequest(rentalId);
    }

    [HttpGet("api/rental-request/get-all-rental-requests")]
    public RentalRequest[] GetAllRentalRequests()
    {
        return _rentalRequestService.GetAllRentalRequests();
    }

    [HttpPost("api/rental-request/edit")]
    public Result EditRentalRequest([FromBody] RentalRequestBlank blank)
    {
        return _rentalRequestService.SaveRentalRequest(blank);
    }

    [HttpPost("api/rental-request/remove")]
    public void RemoveRentalRequest([FromBody] Guid id)
    {
        _rentalRequestService.RemoveRentalRequest(id);
    }
}