using System.Security.Cryptography;
using System.Text;

namespace RentCars.Tools.Extensions;

public static class StringExtension
{
    public static Boolean IsNullOrWhiteSpace(this String? value)
    {
        return String.IsNullOrEmpty(value?.Trim());
    }

    public static String GetHash(this String inputData)
    {
        MD5 md5 = MD5.Create();
        Byte[] hash = md5.ComputeHash(Encoding.UTF8.GetBytes(inputData));

        return Convert.ToBase64String(hash);
    }
}