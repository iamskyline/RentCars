using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.Services.Users.Repositories;

public interface IUserRepository
{
    void SaveUser(User user);

    User? GetUser(Guid userId);
    User[] GetAllUsers();
    Result Authorization(String login, String password);

    Result Logout(Guid userId);
    void RemoveUser(Guid userId);
}