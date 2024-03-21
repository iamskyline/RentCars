using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.Services.Users.Repositories;

public class UserRepository : IUserRepository
{
    public void SaveUser(User user)
    {
        throw new NotImplementedException();
    }

    public User? GetUser(Guid userId)
    {
        throw new NotImplementedException();
    }

    public User[] GetAllUsers()
    {
        throw new NotImplementedException();
    }

    public Result Authorization(String login, String password)
    {
        throw new NotImplementedException();
    }

    public Result Logout(Guid userId)
    {
        throw new NotImplementedException();
    }

    public void RemoveUser(Guid userId)
    {
        throw new NotImplementedException();
    }
}