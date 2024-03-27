using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.Services.Vehicles;
using RentCars.Domain.Vehicles;
using RentCars.Tools.Results;

namespace RentCars.WebAPI.Controllers;

public class VehicleController : ControllerBase
{
    private readonly IVehicleService _vehicleService;

    public VehicleController(IVehicleService vehicleService)
    {
        _vehicleService = vehicleService;
    }

    [HttpPost("api/vehicles/create")]
    public Result SaveVehicle([FromBody] VehicleBlank blank)
    {
        return _vehicleService.SaveVehicle(blank);
    }

    [HttpGet("api/vehicles/get-by-id")]
    public Vehicle? GetVehicleById(Guid id)
    {
        return _vehicleService.GetVehicle(id);
    }

    [HttpGet("api/vehicles/get-all-vehicle")]
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