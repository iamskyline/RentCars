using Npgsql;
using RentCars.Domain.Users;
using RentCars.Services.Users.Repositories.Converters;
using RentCars.Services.Users.Repositories.Models;
using RentCars.Tools.DataBase;
using RentCars.Tools.Results;

namespace RentCars.Services.Users.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMainConnector _mainConnector;

    public UserRepository(IMainConnector mainConnector)
    {
        _mainConnector = mainConnector;
    }

    public void SaveUser(User user)
    {
        DateTime dateTimeNowUtc = DateTime.UtcNow;
        Boolean defaultIsRemovedValue = false;

        NpgsqlParameter[] parameters =
        {
            new("u_id", user.Id),
            new("u_name", user.Name),
            new("u_tel", user.Tel),
            new("u_login", user.Login),
            new("u_password", user.Password),
            new("u_avatarpath", user.Photo),
            new("u_registrationdate", user.RegistrationDate),
            new("u_userrole", (Int32)user.UserRole),
            new("u_isremoved", defaultIsRemovedValue),
            new("u_createddatetimeutc", dateTimeNowUtc),
        };

        String query = "INSERT INTO users (id, name, tel, login, password, avatarpath, registrationdate, " +
                       "userrole, isremoved, createddatetimeutc) " +
                       "VALUES (@u_id, @u_name, @u_tel, @u_login, @u_password, @u_avatarpath, " +
                       "@u_registrationdate, @u_userrole, @u_isremoved, @u_createddatetimeutc)";

        _mainConnector.ExecuteNonQuery(query, parameters);
    }

    public User? GetUser(Guid userId)
    {
        NpgsqlParameter[] parameters =
        {
            new("u_id", userId)
        };

        return _mainConnector.Get<UserDb?>("SELECT * FROM users WHERE id = @u_id", parameters)?.ToUser();
    }

    public User[] GetAllUsers()
    {
        return _mainConnector.GetList<UserDb>("SELECT * FROM users").ToUsers();
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
        NpgsqlParameter[] parameters =
        {
            new("u_id", userId)
        };

        _mainConnector.ExecuteNonQuery(
            "UPDATE users SET isRemoved = true WHERE id = @u_id",
            parameters
        );
    }
}