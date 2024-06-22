namespace RentCars.Domain.Vehicles
{
    public class VehiclePhotoBlank
    {
        public Guid Id { get; set; }
        public Guid VehicleId { get; set; }
        public String Path { get; set; }
        public Boolean IsDeleted { get; set; }
    }
}
