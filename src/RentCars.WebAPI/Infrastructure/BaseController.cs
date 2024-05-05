using Microsoft.AspNetCore.Mvc;

namespace RentCars.WebAPI.Infrastructure;

public class BaseController : Controller
{
    public ViewResult ReactApplication()
    {
        return View("ReactApplication");
    }
}
