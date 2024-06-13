﻿using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.Services.Vehicles;
using RentCars.Domain.Vehicles;
using RentCars.Tools.Results;

namespace RentCars.WebAPI.Controllers;

public class VehicleController : Controller
{
    private readonly IVehicleService _vehicleService;

    public VehicleController(IVehicleService vehicleService)
    {
        _vehicleService = vehicleService;
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
    
    [HttpGet("api/vehicles/remove")]
    public Result RemoveVehicle(Guid id)
    {
        return _vehicleService.RemoveVehicle(id);
    }
}