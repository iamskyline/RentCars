using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.Services.Vehicles;
using RentCars.Domain.Vehicles;
using RentCars.Tools.Results;
using RentCars.WebAPI.Infrastructure;

namespace RentCars.WebAPI.Controllers;

public class VehicleController : BaseController
{
    private readonly IVehicleService _vehicleService;

    public VehicleController(IVehicleService vehicleService)
    {
        _vehicleService = vehicleService;
    }

    [HttpGet("/vehicles")]
    [HttpGet("/vehicle-card/{vehicleId}")]
    public IActionResult ViewVehicles()
    {
        return ReactApplication();
    }

    [HttpPost("api/vehicles/save")]
    public Result SaveVehicle([FromBody] VehicleBlank blank)
    {
        return _vehicleService.SaveVehicle(blank);
    }

    [HttpGet("api/vehicles/get-by-id")]
    public Vehicle? GetVehicleById([FromQuery]Guid vehicleId)
    {
        return _vehicleService.GetVehicle(vehicleId);
    }

    [HttpGet("api/vehicles/get-all-vehicles")]
    public Vehicle[] GetAllVehicles()
    {
        return _vehicleService.GetAllVehicles();
    }
    
    [HttpPost("api/vehicles/remove")]
    public void RemoveVehicle([FromBody] Guid id)
    {
        _vehicleService.RemoveVehicle(id);
    }
}