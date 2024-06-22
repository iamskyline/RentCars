import { BodyType } from "./enums/bodyType";
import { FuelType } from "./enums/fuelType";
import { TransmissionType } from "./enums/transmissionType";
import { VehicleClass } from "./enums/vehicleClass";
import { WheelDrive } from "./enums/wheelDrive";
import { Vehicle } from "./vehicle";
import { VehiclePhotoBlank } from "./vehiclePhotoBlank";

export class VehicleBlank {
    constructor(
        public id: string | null,
        public brand: string | null,
        public model: string | null,
        public yearOfManufacture: number | null,
        public vehicleClass: VehicleClass,
        public bodyColor: string | null,
        public bodyType: BodyType,
        public enginePower: number | null,
        public engineCapacity: number,
        public fuelType: FuelType,
        public wheelDrive: WheelDrive,
        public transmissionType: TransmissionType,
        public dayCost: number | null,
        public twoFourDaysCost: number | null,
        public fourSevenDaysCost: number | null,
        public sevenFourteenDaysCost: number | null,
        public fourteenAndMoreDaysCost: number | null,
        public existPhotos: VehiclePhotoBlank[]
    ) { }

    public static empty() {
        return new VehicleBlank(null, null, null, null, VehicleClass.Comfort, null,
            BodyType.Sedan, null, 2.5, FuelType.Gasoline,
            WheelDrive.AllWheelDrive, TransmissionType.Automatic,
            null, null, null, null, null, []);
    }

    public static fromDomain(vehicle: Vehicle): VehicleBlank {
        return new VehicleBlank(vehicle.id, vehicle.brand, vehicle.model, vehicle.yearOfManufacture,
            vehicle.vehicleClass, vehicle.bodyColor, vehicle.bodyType, vehicle.enginePower,
            vehicle.engineCapacity, vehicle.fuelType, vehicle.wheelDrive, vehicle.transmissionType, 
            vehicle.dayCost, vehicle.twoFourDaysCost, vehicle.fourSevenDaysCost, vehicle.sevenFourteenDaysCost, 
            vehicle.fourteenAndMoreDaysCost, VehiclePhotoBlank.fromDomain(vehicle.photos)
        )
    }
}