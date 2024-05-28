namespace RentCars.Domain.Users;

public class NameOfUser
{
    public Guid Id { get; }
    public String Name { get; }
    public String Login { get; }

    public NameOfUser(Guid id, String name, String login)
    {
        Id = id;
        Name = name;
        Login = login;
    }
}