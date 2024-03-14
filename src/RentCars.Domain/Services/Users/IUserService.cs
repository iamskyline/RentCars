using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.Domain.Services.Users;

public interface IUserService
{
    User? GetUser(Guid userId);
    User[] GetAllUsers();

    Result SaveUser(UserBlank blank);

    Result RemoveUser(Guid userId);
}