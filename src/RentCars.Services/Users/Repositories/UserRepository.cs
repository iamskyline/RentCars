using Npgsql;
using RentCars.Domain.Users;
using RentCars.Domain.Users.Enums;
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

    public DataResult<Guid> SaveUser(User user)
    {
        DateTime dateTimeNowUtc = DateTime.UtcNow;
        Boolean defaultIsRemovedValue = false;

        NpgsqlParameter[] parameters =
        {
            new("p_id", user.Id),
            new("p_name", user.Name),
            new("p_tel", user.Tel),
            new("p_login", user.Login),
            new("p_password", user.Password),
            new("p_avatarpath", user.Photo),
            new("p_registrationdate", user.RegistrationDate),
            new("p_userrole", (Int32)user.UserRole),
            new("p_isremoved", defaultIsRemovedValue),
            new("p_createddatetimeutc", dateTimeNowUtc),
            new("p_modifieddatetimeutc", dateTimeNowUtc)
        };

        String query = "INSERT INTO users (id, name, tel, login, password, avatarpath, registrationdate, " +
                       "userrole, isremoved, createddatetimeutc) " +
                       "VALUES (@p_id, @p_name, @p_tel, @p_login, @p_password, @p_avatarpath, " +
                       "@p_registrationdate, @p_userrole, @p_isremoved, @p_createddatetimeutc)" +
                       "ON CONFLICT (id) DO UPDATE SET " +
                       "id = @p_id, name = @p_name, tel = @p_tel, login = @p_login, password = @p_password," +
                       "avatarpath = @p_avatarpath, registrationdate = @p_registrationdate, " +
                       "userrole = @p_userrole, isremoved = @p_isremoved, " +
                       "modifieddatetimeutc = @p_modifieddatetimeutc";
        
        try
        {
            _mainConnector.ExecuteNonQuery(query, parameters);
        }
        catch (Exception e)
        {
            return DataResult<Guid>.Fail($"Не удалось сохранить пользователя. {e}");
        }

        return DataResult<Guid>.Success(user.Id);
    }

    public User? GetUser(Guid userId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", userId)
        };

        return _mainConnector.Get<UserDb?>("SELECT * FROM users WHERE id = @p_id", parameters)?.ToUser();
    }

    public User? GetUserByLogin(String login)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_login", login)
        };

        return _mainConnector.Get<UserDb?>("SELECT * FROM users WHERE login = @p_login", parameters)?.ToUser();
    }

    public Int32 GetRentedVehiclesQuantityByUserId(Guid userId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_ids", userId)
        };

        return _mainConnector.Get<Int32>("SELECT COUNT(*) FROM rentalrequests WHERE userId = @p_ids", parameters);
    }

    public User[] GetAllUsers()
    {
        return _mainConnector.GetList<UserDb>("SELECT * FROM users u WHERE NOT u.isRemoved").ToUsers();
    }

    public User[] GetAllClients()
    {
        NpgsqlParameter[] parameters =
        {
            new("p_role", (Int32)Role.Client)
        };

        return _mainConnector.GetList<UserDb>("SELECT * FROM users WHERE userrole = @p_role", parameters).ToUsers();
    }

    public User[] GetUsers(Guid[] ids)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_ids", ids)
        };

        return _mainConnector.GetList<UserDb>("SELECT * FROM users where id = ANY(@p_ids)", parameters).ToUsers();
    }

    public Result Authorization(String login, String password)
    {
        throw new NotImplementedException();
    }

    public Result Logout(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Result RemoveUser(Guid userId)
    {
        NpgsqlParameter[] parameters =
        {
            new("p_id", userId)
        };

        try
        {
            _mainConnector.ExecuteNonQuery(
                "UPDATE users SET isRemoved = true WHERE id = @p_id",
                parameters
            );
        }
        catch (Exception exception)
        {
            return Result.Fail($"Не удалось удалить аккаунт {exception.Message}");
        }

        return Result.Success();
    }
}