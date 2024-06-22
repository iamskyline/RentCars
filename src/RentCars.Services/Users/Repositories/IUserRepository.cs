using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.Services.Users.Repositories;

public interface IUserRepository
{
    DataResult<Guid> SaveUser(User user);

    User? GetUser(Guid userId);
    User? GetUserByLogin(String login);
    User? GetUserByTel(String tel);
    Int32 GetRentedVehiclesQuantityByUserId(Guid userId);
    User[] GetAllUsers();
    User[] GetAllClients();
    User[] GetUsers(Guid[] ids);
    Result Authorization(String login, String password);

    Result Logout(Guid userId);
    Result RemoveUser(Guid userId);
}