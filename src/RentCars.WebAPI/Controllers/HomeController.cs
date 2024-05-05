using Microsoft.AspNetCore.Mvc;
using RentCars.WebAPI.Infrastructure;

namespace RentCars.WebAPI.Controllers;

public class HomeController : BaseController
{
    [HttpGet("/")]
    public IActionResult Index()
    {
        return ReactApplication();
    }

    [HttpGet("/authorization")]
    public IActionResult Auth()
    {
        return ReactApplication();
    }

    [HttpGet("/registration")]
    public IActionResult Registration()
    {
        return ReactApplication();
    }

    [HttpGet("/card")]
    public IActionResult ViewVehicleCard()
    {
        return ReactApplication();
    }

    [HttpGet("/profile")]
    public IActionResult ViewProfile()
    {
        return ReactApplication();
    }
}
