using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using RentCars.Domain.Services.Vehicles;
using RentCars.Domain.Vehicles;
using RentCars.Services.Vehicles.Repositories;
using RentCars.Tools.Extensions;
using RentCars.Tools.Results;

namespace RentCars.Services.Vehicles;

public class VehicleService : IVehicleService
{
    private readonly IVehicleRepository _vehicleRepository;
    private readonly IHostEnvironment _hostEnvironment;

    public VehicleService(IVehicleRepository vehicleRepository, IHostEnvironment hostEnvironment)
    {
        _vehicleRepository = vehicleRepository;
        _hostEnvironment = hostEnvironment;
    }

    public Result SaveVehicle(VehicleBlank blank, List<IFormFile> photos)
    {
        PreprocessVehicleBlank(blank);

        Result validatedVehicleBlankResult = ValidateVehicleBlank(blank);
        if(!validatedVehicleBlankResult.IsSuccess) return Result.Fail(validatedVehicleBlankResult.Errors);

        DataResult<Guid> saveVehicleResult = _vehicleRepository.SaveVehicle(blank);
        if (!saveVehicleResult.IsSuccess) return Result.Fail(saveVehicleResult.Errors[0]);

        DeletePhotos(blank.ExistPhotos);

        foreach (var photo in photos)
        {
            if (photo.Length > 0)
            {
                Guid photoId = Guid.NewGuid();
                var fileName = photoId.ToString() + Path.GetExtension(photo.FileName);

                var uploadsFolder = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", "uploads");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    photo.CopyTo(stream);
                    VehiclePhotoBlank photoBlank = new VehiclePhotoBlank
                    {
                        Id = photoId,
                        VehicleId = blank.Id ?? saveVehicleResult.Data,
                        Path = fileName,
                    };

                    _vehicleRepository.SaveVehiclePhoto(photoBlank);
                }
            }
        }

        return Result.Success();
    }

    private void DeletePhotos(VehiclePhotoBlank[] photoBlanks)
    {
        VehiclePhotoBlank[] photosToDelete = photoBlanks.Where(ph => ph.IsDeleted).ToArray();

        foreach(VehiclePhotoBlank photo in photosToDelete) 
        {
            string filePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", "uploads", photo.Path);
            
            if(File.Exists(filePath)) 
            {
                File.Delete(filePath);
            }
        }

        _vehicleRepository.DeletePhotos(photosToDelete.Select(ph => ph.Id).ToArray());
    }

    private void PreprocessVehicleBlank(VehicleBlank blank)
    {
        blank.Id ??= Guid.NewGuid();
        blank.Brand = blank.Brand?.Trim();
        blank.Model = blank.Model?.Trim();
        blank.BodyColor = blank.BodyColor?.Trim();
    }

    private Result ValidateVehicleBlank(VehicleBlank blank)
    {
        Int32 minProductionYear = 1930;

        Int32 minHorsePowerQuantity = 30;
        Int32 maxHorsePowerQuantity = 1500;
            
        Double minEngineCapacity = 0.1;
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

    public Vehicle[] GetVehicles(Guid[] ids)
    {
        return _vehicleRepository.GetVehicles(ids);
    }

    public Result RemoveVehicle(Guid vehicleId)
    {
        return _vehicleRepository.RemoveVehicle(vehicleId);
    }
}