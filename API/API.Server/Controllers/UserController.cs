using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.Infrastructure;
using RentCars.Domain.Services.Users;
using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.WebAPI.Controllers;

public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("api/users/registration")]
    public DataResult<AuthResponse> Registration([FromBody] UserBlank blank)
    {
        return _userService.Registration(blank);
    }

    [HttpGet("api/users/get-user-by-id")]
    public User? GetUser([FromQuery] Guid userId)
    {
        return _userService.GetUser(userId);
    }

    [HttpGet("api/users/get-quantity-rented-vehicles-by-userid")]
    public Int32 GetRentedVehiclesQuantityByUserId([FromQuery] Guid userId)
    {
        return _userService.GetRentedVehiclesQuantityByUserId(userId);
    }

    [HttpGet("api/users/get-all-users")]
    public User[] GetAllUsers()
    {
        return _userService.GetAllUsers();
    }

    [HttpGet("api/users/get-all-clients")]
    public User[] GetAllClients()
    {
        return _userService.GetAllClients();
    }

    [HttpPost("api/users/edit")]
    public DataResult<Guid> EditUser([FromBody] UserBlank blank)
    {
        return _userService.SaveUser(blank);
    }

    [HttpGet("api/users/remove-account")]
    public Result RemoveAccount(Guid id)
    {
        return _userService.RemoveUser(id);
    }
}