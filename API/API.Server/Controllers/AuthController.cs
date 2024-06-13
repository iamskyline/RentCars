using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.Infrastructure;
using RentCars.Domain.Services.Users;
using RentCars.Tools.Results;

namespace RentCars.WebAPI.Controllers;

public class AuthController : Controller
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    public record UserAuthorizationRequest(String Login, String Password);

    [HttpPost("api/users/authorization")]
    public DataResult<AuthResponse> Authorization([FromBody] UserAuthorizationRequest request)
    {
        return _userService.Authorization(request.Login, request.Password);
    }

    [HttpGet("api/users/logout")]
    public Result Logout(Guid id)
    {
            return _userService.Logout(id);
    }
}