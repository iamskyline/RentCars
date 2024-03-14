using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.Domain.Services.Auth;

public interface IAuthService
{
    Result Registration(UserBlank blank);

    Result Authorization(String login, String password);

    Result Logout(Guid userId);
}