using RentCars.Domain.Vehicles.Enums;

namespace RentCars.Domain.Vehicles;

public class Vehicle
{
    public Guid Id { get; }
    public String Brand { get; }
    public String Model { get; }
    public Int32 YearOfManufacture { get; }
    public VehicleClass VehicleClass { get; }
    public String BodyColor { get; }
    public BodyType BodyType { get; }
    public Int32 EnginePower { get; }
    public Double EngineCapacity { get; }
    public FuelType FuelType { get; }
    public WheelDrive WheelDrive { get; }
    public TransmissionType TransmissionType { get; }
    public Double DayCost { get; }
    public Double TwoFourDaysCost { get; }
    public Double FourSevenDaysCost { get; }
    public Double SevenFourteenDaysCost { get; }
    public Double FourteenAndMoreDaysCost { get; }
    public String? MainPhoto { get; }
    public String[] Photos { get; }

    public Vehicle(Guid id, String brand, String model,
        Int32 yearOfManufacture, VehicleClass vehicleClass,
        String bodyColor, BodyType bodyType, Int32 enginePower,
        Double engineCapacity, FuelType fuelType, WheelDrive wheelDrive,
        TransmissionType transmissionType, Double dayCost, Double twoFourDaysCost,
        Double fourSevenDaysCost, Double sevenFourteenDaysCost,
        Double fourteenAndMoreDaysCost,
        String? mainPhoto, String[] photos
    )
    {
        Id = id;
        Brand = brand;
        Model = model;
        YearOfManufacture = yearOfManufacture;
        VehicleClass = vehicleClass;
        BodyColor = bodyColor;
        BodyType = bodyType;
        EnginePower = enginePower;
        EngineCapacity = engineCapacity;
        FuelType = fuelType;
        WheelDrive = wheelDrive;
        TransmissionType = transmissionType;
        DayCost = dayCost;
        TwoFourDaysCost = twoFourDaysCost;
        FourSevenDaysCost = fourSevenDaysCost;
        SevenFourteenDaysCost = sevenFourteenDaysCost;
        FourteenAndMoreDaysCost = fourteenAndMoreDaysCost;
        MainPhoto = mainPhoto;
        Photos = photos;
    }
}