using RentCars.Domain.Vehicles.Enums;

namespace RentCars.Services.Vehicles.Repositories.Models;

public class VehicleDb
{
    public Guid Id { get; set; }
    public String Brand { get; set; }
    public String Model { get; set; }
    public Int32 YearOfManufacture { get; set; }
    public VehicleClass VehicleClass { get; set; }
    public String BodyColor { get; set; }
    public BodyType BodyType { get; set; }
    public Int32 EnginePower { get; set; }
    public Double EngineCapacity { get; set; }
    public FuelType FuelType { get; set; }
    public WheelDrive WheelDrive { get; set; }
    public TransmissionType TransmissionType { get; set; }
    public Double DayCost { get; set; }
    public Double TwoFourDaysCost { get; set; }
    public Double FourSevenDaysCost { get; set; }
    public Double SevenFourteenDaysCost { get; set; }
    public Double FourteenAndMoreDaysCost { get; set; }
    public String? MainPhotoPath { get; set; }
    public String[] PhotoPaths { get; set; }
}