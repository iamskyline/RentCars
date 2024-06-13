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
using System.Numerics;
using RentCars.Domain.Infrastructure;
using RentCars.Domain.Users.Enums;

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

    public DataResult<Guid> SaveUser(UserBlank blank)
    {
        PreprocessUserBlank(blank);

        Result validateUserBlankResult = ValidateUserBlank(blank, out UserBlank.Valid validUserBlank);
        if (!validateUserBlankResult.IsSuccess) return DataResult<Guid>.Fail(validateUserBlankResult.Errors);

        String hashedPassword = validUserBlank.Password.GetHash();

        User newUser = User.CreateSimpleUser(
            validUserBlank.Id, validUserBlank.Name,
            validUserBlank.Tel, validUserBlank.Login,
            hashedPassword, validUserBlank.Photo,
            validUserBlank.RegistrationDate
        );

        return _userRepository.SaveUser(newUser);
    }

    public DataResult<AuthResponse> Registration(UserBlank userBlank)
    {
        if (userBlank.Name.IsNullOrWhiteSpace())
            return DataResult<AuthResponse>.Fail("Поле \"Имя\" не заполнено!");
        if (userBlank.Tel.IsNullOrWhiteSpace())
            return DataResult<AuthResponse>.Fail("Поле \"Телефон\" не заполнено!");
        if (userBlank.Login.IsNullOrWhiteSpace())
            return DataResult<AuthResponse>.Fail("Поле \"Логин\" не заполнено!");
        if (userBlank.Password.IsNullOrWhiteSpace())
            return DataResult<AuthResponse>.Fail("Поле \"Пароль\" не заполнено!");

        User? existUser = _userRepository.GetUserByLogin(userBlank.Login!);
        if (existUser != null) return DataResult<AuthResponse>.Fail("Такой пользователь уже существует!");

        DataResult<Guid> saveResult = SaveUser(userBlank);
        if(!saveResult.IsSuccess) return DataResult<AuthResponse>.Fail(saveResult.Errors);

        User? savedUser = _userRepository.GetUser(saveResult.Data);
        if(savedUser is null) return DataResult<AuthResponse>.Fail("Сохранённый пользователь не найден");

        String token = FormToken(savedUser);
        AuthResponse authResponse = new(token, savedUser.IsAdmin, savedUser.Id.ToString());
        return DataResult<AuthResponse>.Success(authResponse);
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
        if (blank.Password.IsNullOrWhiteSpace())
            return Result.Fail("Поле \"Пароль\" не заполнено!");

        if (blank.RegistrationDate is not { } registrationDate)
            throw new Exception("Ошибка даты регистрации (null)!");

        validUserBlank = new UserBlank.Valid(
            id, blank.Name!, blank.Tel!, blank.Login!, blank.Password!,
            blank.Photo, registrationDate
        );

        return Result.Success();
    }

    public DataResult<AuthResponse> Authorization(String login, String password)
    {
        //проверка логина
        User? existUser = _userRepository.GetUserByLogin(login);
        if (existUser == null) return DataResult<AuthResponse>.Fail("Пользователя с таким логином не существует!");

        //проверка пароля
        if(existUser.Password != password.GetHash()) return DataResult<AuthResponse>.Fail("Пароль неверен!");

        //формирование токена
        String token = FormToken(existUser);

        AuthResponse authResponse = new(token, existUser.IsAdmin, existUser.Id.ToString());
        return DataResult<AuthResponse>.Success(authResponse);
    }

    private String FormToken(User user)
    {
        String role = user.UserRole switch
        {
            Role.Client => "Client",
            Role.Admin => "Admin",
            _ => throw new ArgumentException("Неизвестный тип пользователя")
        };

        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, role)
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