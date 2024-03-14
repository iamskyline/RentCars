using RentCars.Domain.Users.Enums;

namespace RentCars.Domain.Users;

public class User
{
    public Guid Id { get; }
    public String Name { get; }
    public String Tel { get; }
    public String Login { get; }
    public String Password { get; }
    public String Photo { get; }
    public DateTime RegistrationDate { get; }
    public UserRole Role { get; set; }

    public User(
        Guid id, String name, String tel, String login,
        String password, String photo, DateTime registrationDate,
        UserRole role
    )
    {
        Id = id;
        Name = name;
        Tel = tel;
        Login = login;
        Password = password;
        Photo = photo;
        RegistrationDate = registrationDate;
        Role = role;
    }
}