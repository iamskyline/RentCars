using RentCars.Domain.Users.Enums;

namespace RentCars.Domain.Users;

public class User
{
    public Guid Id { get; }
    public String Name { get; }
    public String Tel { get; }
    public String Login { get; }
    public String Password { get; }
    public String? Photo { get; }
    public DateTime RegistrationDate { get; }
    public Role UserRole { get; set; }

    public User(
        Guid id, String name, String tel, String login,
        String password, String? photo, DateTime registrationDate,
        Role userRole
    )
    {
        Id = id;
        Name = name;
        Tel = tel;
        Login = login;
        Password = password;
        Photo = photo;
        RegistrationDate = registrationDate;
        UserRole = userRole;
    }

    public static User CreateSimpleUser(
        Guid id, String name, String tel, String login,
        String password, String? photo, DateTime registrationDate
    )
    {
        return new User(id, name, tel, login, password, photo, registrationDate, Role.Client);
    }
}