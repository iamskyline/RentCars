using RentCars.Domain.Users.Enums;

namespace RentCars.Domain.Users;

public class User
{
    public Guid Id { get; }
    public String Name { get; }
    public String Tel { get; }
    public String Login { get; }
    public String Password { get; }
    public String? AvatarPath { get; }
    public DateTime RegistrationDate { get; }
    public Role UserRole { get; set; }
    public Boolean IsAdmin => UserRole == Role.Admin;

    public User(
        Guid id, String name, String tel, String login,
        String password, String? avatarPath, DateTime registrationDate,
        Role userRole
    )
    {
        Id = id;
        Name = name;
        Tel = tel;
        Login = login;
        Password = password;
        AvatarPath = avatarPath;
        RegistrationDate = registrationDate;
        UserRole = userRole;
    }

    public NameOfUser ToNameOf()
    {
        return new NameOfUser(Id, Name, Login);
    }

    public static User CreateSimpleUser(
        Guid id, String name, String tel, String login,
        String password, String? avatarPath, DateTime registrationDate
    )
    {
        return new User(id, name, tel, login, password, avatarPath, registrationDate, Role.Client);
    }
}