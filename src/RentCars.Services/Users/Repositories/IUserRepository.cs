using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.Services.Users.Repositories;

public interface IUserRepository
{
    void SaveUser(User user);

    User? GetUser(Guid userId);
    User? GetUserByLogin(String login);
    User[] GetAllUsers();
    User[] GetUsers(Guid[] ids);
    Result Authorization(String login, String password);

    Result Logout(Guid userId);
    void RemoveUser(Guid userId);
}