using RentCars.Domain.Vehicles.Enums;

namespace RentCars.Domain.Vehicles;

public partial class VehicleBlank
{
    public Guid? Id { get; set; }
    public String? Brand { get; set; }
    public String? Model { get; set; }
    public Int32? YearOfManufacture { get; set; }
    public VehicleClass? VehicleClass { get; set; }
    public String? BodyColor { get; set; }
    public BodyType? BodyType { get; set; }
    public Int32? EnginePower { get; set; }
    public Double? EngineCapacity { get; set; }
    public FuelType? FuelType { get; set; }
    public WheelDrive? WheelDrive { get; set; }
    public TransmissionType? TransmissionType { get; set; }
    public Double? DayCost { get; set; }
    public Double? TwoFourDaysCost { get; set; }
    public Double? FourSevenDaysCost { get; set; }
    public Double? SevenFourteenDaysCost { get; set; }
    public Double? FourteenAndMoreDaysCost { get; set; }
    public String? MainPhotoPath { get; set; }
    public String[]? PhotoPaths { get; set; }
}
public partial class VehicleBlank
{
    public class Valid
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
        public String?[] PhotoPaths { get; set; }

        public Valid(Guid id, String brand, String model,
            Int32 yearOfManufacture, VehicleClass vehicleClass,
            String bodyColor, BodyType bodyType, Int32 enginePower,
            Double engineCapacity, FuelType fuelType,
            TransmissionType transmissionType, WheelDrive wheelDrive,
            Double dayCost, Double twoFourDaysCost, Double fourSevenDaysCost,
            Double sevenFourteenDaysCost, Double fourteenAndMoreDaysCost,
            String? mainPhotoPath, String[] photoPaths
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
            MainPhotoPath = mainPhotoPath;
            PhotoPaths = photoPaths;
        }
    }
}