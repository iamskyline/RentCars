using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RentCars.Domain.Services.Users;
using RentCars.Domain.Users;
using RentCars.Services.Users.Repositories;
using RentCars.Tools.Extensions;
using RentCars.Tools.JWT;
using RentCars.Tools.Results;
using System.Security.Claims;

namespace RentCars.Services.Users;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public UserService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public Result SaveUser(UserBlank blank)
    {
        PreprocessUserBlank(blank);

        Result validateUserBlankResult = ValidateUserBlank(blank, out UserBlank.Valid validUserBlank);
        if (!validateUserBlankResult.IsSuccess) return Result.Fail(validateUserBlankResult.Errors);

        String hashedPassword = validUserBlank.Password.GetHash();

        User newUser = User.CreateSimpleUser(
            validUserBlank.Id, validUserBlank.Name,
            validUserBlank.Tel, validUserBlank.Login,
            hashedPassword, validUserBlank.Photo,
            validUserBlank.RegistrationDate
        );

        _userRepository.SaveUser(newUser);

        return Result.Success();
    }

    private void PreprocessUserBlank(UserBlank blank)
    {
        blank.Id ??= Guid.NewGuid();
        blank.Name = blank.Name?.Trim();
        blank.Tel = blank.Tel?.Trim();
        blank.Login = blank.Login?.Trim();
        blank.Password = blank.Password?.Trim();
        blank.RegistrationDate = DateTime.UtcNow;
    }

    private Result ValidateUserBlank(UserBlank blank, out UserBlank.Valid validUserBlank)
    {
        validUserBlank = null!;

        if (blank.Id is not { } id)
            throw new Exception("Ошибка уникального идентификатора ID (null)!");

        if(blank.Name.IsNullOrWhiteSpace())
            return Result.Fail("Поле \"Имя\" не заполнено!");
        if (blank.Tel.IsNullOrWhiteSpace())
            return Result.Fail("Поле \"Телефон\" не заполнено!");
        if (blank.Login.IsNullOrWhiteSpace())
            return Result.Fail("Поле \"Логин\" не заполнено!");
        if (blank.Login.IsNullOrWhiteSpace())
            return Result.Fail("Поле \"Пароль\" не заполнено!");

        if (blank.RegistrationDate is not { } registrationDate)
            throw new Exception("Ошибка даты регистрации (null)!");

        validUserBlank = new UserBlank.Valid(
            id, blank.Name!, blank.Tel!, blank.Login!, blank.Password!,
            blank.Photo, registrationDate
        );

        return Result.Success();
    }

    public DataResult<String> Authorization(String login, String password)
    {
        //проверка логина
        User? existUser = _userRepository.GetUserByLogin(login);
        if (existUser == null) return DataResult<String>.Fail("Пользователя с таким логином не существует!");

        //проверка пароля
        if(existUser.Password != password) return DataResult<String>.Fail("Пароль неверен!");

        //формирование токена
        String token = FormToken(existUser);

        return DataResult<String>.Success(token);
    }

    private String FormToken(User user)
    {
        /*String role = user.UserRole switch
        {
            Role.Client => "Client",
            Role.Admin => "Admin"
        };*/

        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.UserRole.ToString())
        };

        DateTime startDateTime = DateTime.Now;
        DateTime endDateTime = startDateTime.AddDays(7);

        String issuer = _configuration.GetSection("JWTSettings:Issuer").Value!;
        String audience = _configuration.GetSection("JWTSettings:Audience").Value!;
        String secretKey = _configuration.GetSection("JWTSettings:SecretKey").Value!;
        SymmetricSecurityKey signingKey = JwtTools.FormSigningKey(secretKey!);
        SigningCredentials credentials = new(signingKey, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken token = new JwtSecurityToken(issuer, audience, claims, startDateTime, endDateTime, credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public User? GetUser(Guid userId)
    {
        return _userRepository.GetUser(userId);
    }

    public Int32 GetRentedVehiclesQuantityByUserId(Guid userId)
    {
        return _userRepository.GetRentedVehiclesQuantityByUserId(userId);
    }

    public User[] GetAllUsers()
    {
        return _userRepository.GetAllUsers();
    }

    public User[] GetAllClients()
    {
        return _userRepository.GetAllClients();
    }

    public User[] GetUsers(Guid[] ids)
    {
        return _userRepository.GetUsers(ids);
    }

    public Result Logout(Guid userId)
    {
        throw new NotImplementedException();
    }

    public void RemoveUser(Guid userId)
    {
        _userRepository.RemoveUser(userId);
    }
}