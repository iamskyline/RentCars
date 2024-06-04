namespace RentCars.Domain.Infrastructure;

public class AuthResponse
{
    public String Token { get; }
    public Boolean IsAdmin { get; }

    public AuthResponse(String token, Boolean isAdmin)
    {
        Token = token;
        IsAdmin = isAdmin;
    }
}