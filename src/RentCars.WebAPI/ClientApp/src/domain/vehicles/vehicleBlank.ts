import { BodyType } from "./enums/bodyType";
import { FuelType } from "./enums/fuelType";
import { TransmissionType } from "./enums/transmissionType";
import { VehicleClass } from "./enums/vehicleClass";
import { WheelDrive } from "./enums/wheelDrive";

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
        public mainPhoto: string | null,
        public photos: string[] | null
    ) { }

    public static empty() {
        return new VehicleBlank(null, null, null, null, VehicleClass.Comfort, null,
            BodyType.Sedan, null, 2.5, FuelType.Gasoline,
            WheelDrive.AllWheelDrive, TransmissionType.Automatic,
            null, null, null, null, null, null, null);
    }
}