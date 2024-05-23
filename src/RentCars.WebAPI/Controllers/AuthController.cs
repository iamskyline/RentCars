using Microsoft.AspNetCore.Mvc;
using RentCars.Domain.Services.Users;
using RentCars.Tools.Results;
using RentCars.WebAPI.Infrastructure;

namespace RentCars.WebAPI.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        public record UserAuthorizationRequest(String Login, String Password);

        [HttpPost("api/users/authorization")]
        public DataResult<String> Authorization([FromBody] UserAuthorizationRequest request)
        {
            return _userService.Authorization(request.Login, request.Password);
        }

        [HttpGet("api/users/logout")]
        public Result Logout(Guid id)
        {
            return _userService.Logout(id);
        }
    }
}
