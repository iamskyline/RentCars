using RentCars.Domain.Users;
using RentCars.Services.Users.Repositories.Models;

namespace RentCars.Services.Users.Repositories.Converters;

public static class UserConverter
{
    public static User ToUser(this UserDb userDb)
    {
        return new User(
            userDb.Id, userDb.Name,
            userDb.Tel, userDb.Login,
            userDb.Password, userDb.Photo,
            userDb.RegistrationDate, userDb.UserRole
        );
    }

    public static User[] ToUsers(this IEnumerable<UserDb> userDbs)
    {
        return userDbs.Select(u => u.ToUser()).ToArray();
    }
}