namespace RentCars.Domain.Vehicles
{
    public class VehiclePhoto
    {
        public Guid Id { get; }
        public Guid VehicleId { get; }
        public String Path { get; }

        public VehiclePhoto(Guid id, Guid vehicleId, String path)
        {
            Id = id;
            VehicleId = vehicleId;
            Path = path;
        }
    }
}
