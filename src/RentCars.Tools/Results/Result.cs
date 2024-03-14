namespace RentCars.Tools.Results;

public class Result
{
    public String[] Errors { get; }
    public Boolean IsSuccess => Errors.Length == 0;

    private Result(String[] errors)
    {
        Errors = errors;
    }

    public static Result Success()
    {
        return new Result(Array.Empty<String>());
    }

    public static Result Fail(String error)
    {
        return new Result(new[] { error });
    }

    public static Result Fail(String[] errors)
    {
        return new Result(errors);
    }
}