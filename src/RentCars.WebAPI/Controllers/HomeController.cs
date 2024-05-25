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

    [HttpGet("/profile")]
    public IActionResult ViewProfileCard()
    {
        return ReactApplication();
    }

    /*[HttpGet("/confirmation")]
    public IActionResult ViewConfirmationCard()
    {
        return ReactApplication();
    }*/
}
