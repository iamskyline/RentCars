﻿using RentCars.Domain.Vehicles.Enums;
using RentCars.Tools;

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
    public Money DayCost { get; }
    public Money TwoFourDaysCost { get; }
    public Money FourSevenDaysCost { get; }
    public Money SevenFourteenDaysCost { get; }
    public Money FourteenAndMoreDaysCost { get; }
    public String MainPhotoPath { get; }
    public String[] PhotoPaths { get; }

    public Vehicle(Guid id, String brand, String model,
        Int32 yearOfManufacture, VehicleClass vehicleClass,
        String bodyColor, BodyType bodyType, Int32 enginePower,
        Double engineCapacity, FuelType fuelType, WheelDrive wheelDrive,
        Money dayCost, Money twoFourDaysCost, Money fourSevenDaysCost,
        Money sevenFourteenDaysCost, Money fourteenAndMoreDaysCost,
        String mainPhotoPath, String[] photos
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
        DayCost = dayCost;
        TwoFourDaysCost = twoFourDaysCost;
        FourSevenDaysCost = fourSevenDaysCost;
        SevenFourteenDaysCost = sevenFourteenDaysCost;
        FourteenAndMoreDaysCost = fourteenAndMoreDaysCost;
        MainPhotoPath = mainPhotoPath;
        PhotoPaths = photos;
    }
}