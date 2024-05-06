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
    public IActionResult ViewAuthorizationPage()
    {
        return ReactApplication();
    }

    [HttpGet("/registration")]
    public IActionResult ViewRegistrationPage()
    {
        return ReactApplication();
    }

    [HttpGet("/card")]
    public IActionResult ViewVehicleCard()
    {
        return ReactApplication();
    }

    [HttpGet("/profile")]
    public IActionResult ViewProfileCard()
    {
        return ReactApplication();
    }

    [HttpGet("/confirmation")]
    public IActionResult ViewNotificationCard()
    {
        return ReactApplication();
    }

    [HttpGet("/edit-profile")]
    public IActionResult ViewEditProfileForm()
    {
        return ReactApplication();
    }

    [HttpGet("/request-form")]
    public IActionResult ViewRequestForm()
    {
        return ReactApplication();
    }

    [HttpGet("/vehicle-form")]
    public IActionResult ViewVehicleForm()
    {
        return ReactApplication();
    }
}
