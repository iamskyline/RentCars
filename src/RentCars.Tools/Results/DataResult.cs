using System.Diagnostics.CodeAnalysis;

namespace RentCars.Tools.Results;

public class DataResult<T>
{
    public T? Data { get; }
    public String[] Errors { get; }

    [MemberNotNullWhen(true, nameof(Data))]
    public Boolean IsSuccess => Errors.Length == 0;

    private DataResult(T? data, String[] errors)
    {
        Data = data;
        Errors = errors;
    }

    public static DataResult<T> Success(T data)
    {
        return new DataResult<T>(data, Array.Empty<String>());
    }

    public static DataResult<T> Fail(String error)
    {
        return new DataResult<T>(default, new[] { error });
    }

    public static DataResult<T> Fail(String[] errors)
    {
        return new DataResult<T>(default, errors);
    }
}