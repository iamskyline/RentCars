using RentCars.Domain.Users.Enums;

namespace RentCars.Services.Users.Repositories.Models;

public class UserDb
{
    public Guid Id { get; set; }
    public String Name { get; set; }
    public String Tel { get; set; }
    public String Login { get; set; }
    public String Password { get; set; }
    public String? Photo { get; set; }
    public DateTime RegistrationDate { get; set; }
    public Role UserRole { get; set; }
}