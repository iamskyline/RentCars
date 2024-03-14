namespace RentCars.Domain.Users;

public partial class UserBlank
{
    public Guid? Id { get; set; }
    public String? Name { get; set; }
    public String? Tel { get; set; }
    public String? Login { get; set; }
    public String? Password { get; set; }
    public String? Photo { get; set; }
    public DateTime? RegistrationDate { get; set; }
    public Boolean? IsAdmin { get; set; }
}

public partial class UserBlank
{
    public class Valid
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
        public String Tel { get; set; }
        public String Login { get; set; }
        public String Password { get; set; }
        public String Photo { get; set; }
        public DateTime RegistrationDate { get; set; }
        public Boolean IsAdmin { get; set; }

        public Valid(Guid id, String name, String tel,
            String login, String password, String photo,
            DateTime registrationDate, Boolean isAdmin
        )
        {
            Id = id;
            Name = name;
            Tel = tel;
            Login = login;
            Password = password;
            Photo = photo;
            RegistrationDate = registrationDate;
            IsAdmin = isAdmin;
        }
    }
}