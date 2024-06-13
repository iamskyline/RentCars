using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.RentalRequests;
using RentCars.Domain.Services.RentalRequests;
using RentCars.Domain.Services.Users;
using RentCars.Domain.Services.Vehicles;
using RentCars.Domain.Users;
using RentCars.Domain.Vehicles;
using RentCars.Tools.Results;

namespace RentCars.WebAPI.Controllers;

public class RentalRequestController : Controller
{
    private readonly IRentalRequestService _rentalRequestService;
    private readonly IUserService _userService;
    private readonly IVehicleService _vehicleService;

    public RentalRequestController(
        IRentalRequestService rentalRequestService,
        IUserService userService, IVehicleService vehicleService
    )
    {
        _rentalRequestService = rentalRequestService;
        _userService = userService;
        _vehicleService = vehicleService;
    }

    [HttpPost("api/rental-request/create")]
    public Result SaveRentalRequest([FromBody] RentalRequestBlank blank)
    {
        return _rentalRequestService.SaveRentalRequest(blank);
    }

    [HttpGet("api/rental-request/get-by-id")]
    public RentalRequest? GetRentalRequestById([FromQuery] Guid rentalRequestId)
    {
        return _rentalRequestService.GetRentalRequest(rentalRequestId);
    }

    [HttpGet("api/rental-request/get-all-rental-requests")]
    public Object GetAllRentalRequests()
    {
        RentalRequest[] rents = _rentalRequestService.GetAllRentalRequests();
        Guid[] userRentIds = rents.Select(r => r.UserId).ToArray();
        Guid[] vehicleRentIds = rents.Select(r => r.VehicleId).ToArray();
        NameOfUser[] rentUsers = _userService.GetUsers(userRentIds).Select(u => u.ToNameOf()).ToArray();
        NameOfVehicle[] rentVehicles = _vehicleService.GetVehicles(vehicleRentIds).Select(v => v.ToNameOf()).ToArray();
        
        return new
        {
            Rents = rents,
            Users = rentUsers,
            Vehicles = rentVehicles
        };
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