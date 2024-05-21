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

    [HttpGet("/item")]
    public IActionResult ViewVehicleItem()
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

    [HttpGet("/profile-form")]
    public IActionResult ViewEditProfileForm()
    {
        return ReactApplication();
    }

    [HttpGet("/request-form")]
    public IActionResult ViewRequestForm()
    {
        return ReactApplication();
    }

    [HttpGet("/vehicle-form-card")]
    public IActionResult ViewVehicleForm()
    {
        return ReactApplication();
    }

    [HttpGet("/vehicle-card")]
    public IActionResult ViewVehicleCard()
    {
        return ReactApplication();
    }

    [HttpGet("/user-card")]
    public IActionResult ViewUserCard()
    {
        return ReactApplication();
    }

    [HttpGet("/request-card")]
    public IActionResult ViewRequestCard()
    {
        return ReactApplication();
    }

    [HttpGet("/vehicle")]
    public IActionResult ViewVehicle()
    {
        return ReactApplication();
    }

    [HttpGet("/vehicle-form")]
    public IActionResult ViewVehicleFormPage()
    {
        return ReactApplication();
    }

    [HttpGet("/requests")]
    public IActionResult ViewRequestsPage()
    {
        return ReactApplication();
    }
}
