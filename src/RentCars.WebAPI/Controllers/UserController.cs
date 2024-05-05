using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.Services.Users;
using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.WebAPI.Controllers;

public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("api/users/registration")]
    public Result Registration([FromBody] UserBlank blank)
    {
        return _userService.SaveUser(blank);
    }

    [HttpGet("api/users/get-user-by-id")]
    public User GetUser(Guid id)
    {
        return _userService.GetUser(id);
    }

    [HttpGet("api/users/get-all-users")]
    public User[] GetAllUsers()
    {
        return _userService.GetAllUsers();
    }

    [HttpPost("api/users/edit")]
    public Result EditUser([FromBody] UserBlank blank)
    {
        return _userService.SaveUser(blank);
    }

    [HttpPost("api/users/remove-account")]
    public void RemoveAccount([FromBody] Guid id)
    {
        _userService.RemoveUser(id);
    }
}