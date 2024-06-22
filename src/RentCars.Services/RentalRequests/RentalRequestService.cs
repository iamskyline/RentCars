using RentCars.Domain.RentalRequests;
using RentCars.Domain.Services.RentalRequests;
using RentCars.Services.RentalRequests.Repositories;
using RentCars.Tools.Results;

namespace RentCars.Services.RentalRequests;

public class RentalRequestService : IRentalRequestService
{
    private readonly IRentalRequestRepository _rentalRequestRepository;

    public RentalRequestService(IRentalRequestRepository rentalRequestRepository)
    {
        _rentalRequestRepository = rentalRequestRepository;
    }

    public Result SaveRentalRequest(RentalRequestBlank blank)
    {
        PreprocessRentalRequest(blank);

        Result validatedRentalRequestBlank = ValidateVehicleBlank(blank, out RentalRequestBlank.Valid validRentalRequestBlank);
        if(!validatedRentalRequestBlank.IsSuccess) return Result.Fail(validatedRentalRequestBlank.Errors);

        RentalRequest newRequest = new(
            validRentalRequestBlank.Id,
            validRentalRequestBlank.UserId,
            validRentalRequestBlank.VehicleId,
            validRentalRequestBlank.RentalStartDateTimeUtc,
            validRentalRequestBlank.RentalEndDateTimeUtc,
            validRentalRequestBlank.Status
        );

        _rentalRequestRepository.SaveRentalRequest(newRequest);

        return Result.Success();
    }

    private void PreprocessRentalRequest(RentalRequestBlank blank)
    {
        blank.Id ??= Guid.NewGuid();
    }

    private Result ValidateVehicleBlank(RentalRequestBlank blank, out RentalRequestBlank.Valid validRentalRequestBlank)
    {
        validRentalRequestBlank = null!;

        if (blank.Id is not { } id)
            throw new Exception("Ошибка уникального идентификатора ID (null)!");

        if (blank.UserId is not { } clientId)
            return Result.Fail("Не выбран пользователь на которого оформляется заявка!");
        if (blank.VehicleId is not { } vehicleId)
            return Result.Fail("Не выбран автомобиль который арендуется!");

        if (blank.RentalStartDateTimeUtc is not { } rentalStartDateTimeUtc)
            return Result.Fail("Не выбрана дата начала аренды!");
        if (blank.RentalEndDateTimeUtc is not { } rentalEndDateTimeUtc)
            return Result.Fail("Не выбрана дата окончания аренды!");

        if (rentalEndDateTimeUtc < rentalStartDateTimeUtc)
            return Result.Fail("Дата окончания аренды не может быть меньше даты начала аренды!");
        if (rentalStartDateTimeUtc < DateTime.Now)
            return Result.Fail("Дата начала аренды не может быть меньше текущей!");

        if (blank.Status is not { } status)
            return Result.Fail("Не выбран статус заявки!");

        validRentalRequestBlank = new RentalRequestBlank.Valid(
            id, clientId, vehicleId,
            rentalStartDateTimeUtc,
            rentalEndDateTimeUtc,
            status 
        );

        return Result.Success();
    }

    public RentalRequest? GetRentalRequest(Guid rentalRequestId)
    {
        return _rentalRequestRepository.GetRentalRequest(rentalRequestId);
    }

    public RentalRequest[] GetAllRentalRequests()
    {
        return _rentalRequestRepository.GetAllRentalRequests();
    }

    public Result RemoveRentalRequest(Guid rentalRequestId)
    {
        return _rentalRequestRepository.RemoveRentalRequest(rentalRequestId);
    }
}