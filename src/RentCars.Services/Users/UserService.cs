using RentCars.Domain.Services.Users;
using RentCars.Domain.Users;
using RentCars.Services.Users.Repositories;
using RentCars.Tools.Extensions;
using RentCars.Tools.Results;

namespace RentCars.Services.Users;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public Result Registration(UserBlank blank)
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

    public Result Authorization(String login, String password)
    {
        throw new NotImplementedException();
    }

    public User? GetUser(Guid userId)
    {
        return _userRepository.GetUser(userId);
    }

    public User[] GetAllUsers()
    {
        return _userRepository.GetAllUsers();
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