using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.Domain.Services.Users;

public interface IUserService
{
    Result SaveUser(UserBlank blank);

    User? GetUser(Guid userId);
    Int32 GetRentedVehiclesQuantityByUserId(Guid userId);
    User[] GetAllUsers();
    User[] GetAllClients();
    User[] GetUsers(Guid[] ids);
    DataResult<String> Authorization(String login, String password);

    Result Logout(Guid userId);
    void RemoveUser(Guid userId);
}