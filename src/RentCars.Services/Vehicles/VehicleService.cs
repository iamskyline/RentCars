using RentCars.Domain.Services.Vehicles;
using RentCars.Domain.Vehicles;
using RentCars.Services.Vehicles.Repositories;
using RentCars.Tools.Extensions;
using RentCars.Tools.Results;

namespace RentCars.Services.Vehicles;

public class VehicleService : IVehicleService
{
    private readonly IVehicleRepository _vehicleRepository;

    public VehicleService(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    public Result SaveVehicle(VehicleBlank blank)
    {
        PreprocessVehicleBlank(blank);

        Result validatedVehicleBlankResult = ValidateVehicleBlank(blank, out VehicleBlank.Valid validVehicleBlank);
        if(!validatedVehicleBlankResult.IsSuccess) return Result.Fail(validatedVehicleBlankResult.Errors);

        Vehicle newVehicle = new(
            validVehicleBlank.Id, validVehicleBlank.Brand, validVehicleBlank.Model,
            validVehicleBlank.YearOfManufacture, validVehicleBlank.VehicleClass,
            validVehicleBlank.BodyColor, validVehicleBlank.BodyType,
            validVehicleBlank.EnginePower, validVehicleBlank.EngineCapacity,
            validVehicleBlank.FuelType, validVehicleBlank.WheelDrive,
            validVehicleBlank.TransmissionType,
            validVehicleBlank.DayCost, validVehicleBlank.TwoFourDaysCost,
            validVehicleBlank.FourSevenDaysCost, validVehicleBlank.SevenFourteenDaysCost,
            validVehicleBlank.FourteenAndMoreDaysCost, validVehicleBlank.MainPhotoPath,
            validVehicleBlank.PhotoPaths
        );

        _vehicleRepository.SaveVehicle(newVehicle);

        return Result.Success();
    }

    private void PreprocessVehicleBlank(VehicleBlank blank)
    {
        blank.Id ??= Guid.NewGuid();
        blank.Brand = blank.Brand?.Trim();
        blank.Model = blank.Model?.Trim();
        blank.BodyColor = blank.BodyColor?.Trim();
        blank.MainPhotoPath = blank.MainPhotoPath?.Trim();
    }

    private Result ValidateVehicleBlank(VehicleBlank blank, out VehicleBlank.Valid validVehicleBlank)
    {
        validVehicleBlank = null!;

        Int32 minProductionYear = 1950;

        Int32 minHorsePowerQuantity = 30;
        Int32 maxHorsePowerQuantity = 1500;

        Double minEngineCapacity = 0.5;
        Double maxEngineCapacity = 8.5;

        Double minRentalCost = 0;
        Double maxRentalCost = 1000000;

        if (blank.Id is not { } id)
            throw new Exception("Ошибка уникального идентификатора ID (null)!");

        if (blank.Brand.IsNullOrWhiteSpace())
            return Result.Fail("Поле \"Марка автомобиля\" не заполнено!");
        if (blank.Model.IsNullOrWhiteSpace())
            return Result.Fail("Поле \"Модель автомобиля\" не заполнено!");
        if (blank.YearOfManufacture is not { } yearOfManufacture)
            return Result.Fail("Поле \"Год производства\" не заполнено!");
        if (blank.YearOfManufacture > DateTime.Now.Year)
            return Result.Fail("Год производства автомобиля не может быть больше текущего!");
        if (blank.YearOfManufacture < minProductionYear)
            return Result.Fail("Год производства автомобиля указан неверно!");
        if(blank.VehicleClass is not {} vehicleClass)
            return Result.Fail("Класс автомобиля не выбран!");
        if (blank.BodyColor.IsNullOrWhiteSpace())
            return Result.Fail("Поле \"Цвет автомобиля\" не заполнено!");
        if (blank.BodyType is not { } bodyType)
            return Result.Fail("Тип кузова автомобиля не выбран!");

        if (blank.EnginePower is not { } enginePower)
            return Result.Fail("Поле \"Мощность двигателя\" не заполнено!");
        if (blank.EnginePower < minHorsePowerQuantity)
            return Result.Fail($"Количество лошадинных сил не должно быть меньше {minHorsePowerQuantity} л.с.!");
        if (blank.EnginePower > maxHorsePowerQuantity)
            return Result.Fail($"Количество лошадинных сил не должно быть больше {maxHorsePowerQuantity} л.с.!");
        if (blank.EngineCapacity is not { } engineCapacity)
            return Result.Fail("Поле \"Объем двигателя\" не заполнено!");
        if (blank.EngineCapacity < minEngineCapacity)
            return Result.Fail($"Объем двигателя не должен быть меньше {minEngineCapacity} л.!");
        if (blank.EngineCapacity > maxEngineCapacity)
            return Result.Fail($"Объем двигателя не должен быть больше {maxEngineCapacity} л.!");

        if (blank.FuelType is not { } fuelType)
            return Result.Fail("Тип топлива для автомобиля не выбран!");
        if (blank.WheelDrive is not { } wheelDrive)
            return Result.Fail("Тип привода автомобиля не выбран!");
        if (blank.TransmissionType is not { } transmissionType)
            return Result.Fail("Тип трансмиссии автомобиля не выбран!");

        if (blank.DayCost is not { } dayCost)
            return Result.Fail("Поле \"Стоимость суток аренды\" не заполнено!");
        if (blank.DayCost < minRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть меньше {minRentalCost} руб.!");
        if (blank.DayCost > maxRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть больше {maxRentalCost} руб.!");

        if (blank.TwoFourDaysCost is not { } twoFourDaysCost)
            return Result.Fail("Поле \"Стоимость 2-4 суток аренды\" не заполнено!");
        if (blank.TwoFourDaysCost < minRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть меньше {minRentalCost} руб.!");
        if (blank.TwoFourDaysCost > maxRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть больше {maxRentalCost} руб.!");

        if (blank.FourSevenDaysCost is not { } fourSevenDaysCost)
            return Result.Fail("Поле \"Стоимость 4-7 суток аренды\" не заполнено!");
        if (blank.FourSevenDaysCost < minRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть меньше {minRentalCost} руб.!");
        if (blank.FourSevenDaysCost > maxRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть больше {maxRentalCost} руб.!");

        if (blank.SevenFourteenDaysCost is not { } sevenFourteenDaysCost)
            return Result.Fail("Поле \"Стоимость 4-7 суток аренды\" не заполнено!");
        if (blank.SevenFourteenDaysCost < minRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть меньше {minRentalCost} руб.!");
        if (blank.SevenFourteenDaysCost > maxRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть больше {maxRentalCost} руб.!");

        if (blank.FourteenAndMoreDaysCost is not { } fourteenAndMoreDaysCost)
            return Result.Fail("Поле \"Стоимость 4-7 суток аренды\" не заполнено!");
        if (blank.FourteenAndMoreDaysCost < minRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть меньше {minRentalCost} руб.!");
        if (blank.FourteenAndMoreDaysCost > maxRentalCost)
            return Result.Fail($"Стоимость суток аренды не должно быть больше {maxRentalCost} руб.!");

        if (blank.PhotoPaths is not { } photoPaths)
            throw new Exception("Массив путей к фотографиям автомобиля пуст (null)!");

        validVehicleBlank = new VehicleBlank.Valid(
            id, blank.Brand!, blank.Model!, yearOfManufacture,
            vehicleClass, blank.BodyColor!, bodyType,
            enginePower, engineCapacity, fuelType, transmissionType,
            wheelDrive, dayCost, twoFourDaysCost,
            fourSevenDaysCost, sevenFourteenDaysCost,
            fourteenAndMoreDaysCost, blank.MainPhotoPath,
            blank.PhotoPaths
        );

        return Result.Success();
    }

    public Vehicle? GetVehicle(Guid vehicleId)
    {
        return _vehicleRepository.GetVehicle(vehicleId);
    }

    public Vehicle[] GetAllVehicles()
    {
        return _vehicleRepository.GetAllVehicles();
    }

    public void RemoveVehicle(Guid vehicleId)
    {
        _vehicleRepository.RemoveVehicle(vehicleId);
    }
}