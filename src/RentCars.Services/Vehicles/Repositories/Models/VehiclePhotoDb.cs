namespace RentCars.Services.Vehicles.Repositories.Models
{
    public class VehiclePhotoDb
    {
        public Guid Id { get; set; }
        public Guid VehicleId { get; set; }
        public String Path { get; set; }
    }
}
