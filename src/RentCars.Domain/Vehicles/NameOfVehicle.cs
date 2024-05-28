namespace RentCars.Domain.Vehicles;

public class NameOfVehicle
{
    public Guid Id { get; }
    public String Brand { get; }
    public String Model { get; }

    public NameOfVehicle(Guid id, String brand, String model)
    {
        Id = id;
        Brand = brand;
        Model = model;
    }
}