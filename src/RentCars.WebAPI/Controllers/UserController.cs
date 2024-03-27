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
        return _userService.Registration(blank);
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

    public record UserAuthorizationRequest(String Login, String Password);

    [HttpGet("api/users/authorization")]
    public Result Authorization([FromBody] UserAuthorizationRequest request)
    {
        return _userService.Authorization(request.Login, request.Password);
    }

    [HttpGet("api/users/logout")]
    public Result Logout(Guid id)
    {
        return _userService.Logout(id);
    }

    [HttpPost("api/users/remove-account")]
    public void RemoveAccount([FromBody] Guid id)
    {
        _userService.RemoveUser(id);
    }
}