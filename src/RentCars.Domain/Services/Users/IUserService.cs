using RentCars.Domain.Infrastructure;
using RentCars.Domain.Users;
using RentCars.Tools.Results;

namespace RentCars.Domain.Services.Users;

public interface IUserService
{
    DataResult<Guid> SaveUser(UserBlank blank);
    User? GetUser(Guid userId);
    Int32 GetRentedVehiclesQuantityByUserId(Guid userId);
    User[] GetAllUsers();
    User[] GetAllClients();
    User[] GetUsers(Guid[] ids);
    DataResult<AuthResponse> Registration(UserBlank blank);
    DataResult<AuthResponse> Authorization(String login, String password);

    Result Logout(Guid userId);
    Result RemoveUser(Guid userId);
}