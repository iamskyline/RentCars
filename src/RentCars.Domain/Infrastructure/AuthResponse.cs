namespace RentCars.Domain.Infrastructure;

public class AuthResponse
{
    public String Token { get; }
    public Boolean IsAdmin { get; }
    public String UserId { get; set; }
    public String UserName { get; set; }

    public AuthResponse(String token, Boolean isAdmin, String userId, String userName)
    {
        Token = token;
        IsAdmin = isAdmin;
        UserId = userId;
        UserName = userName;
    }
}