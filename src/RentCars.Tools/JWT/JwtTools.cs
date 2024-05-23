using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace RentCars.Tools.JWT;

public class JwtTools
{
    public static SymmetricSecurityKey FormSigningKey(String secretKey)
    {
        return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
    }
}