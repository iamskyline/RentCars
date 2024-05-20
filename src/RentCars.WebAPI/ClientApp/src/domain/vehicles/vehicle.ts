import { BodyType } from "./enums/bodyType";
import { FuelType } from "./enums/fuelType";
import { TransmissionType } from "./enums/transmissionType";
import { VehicleClass } from "./enums/vehicleClass";
import { WheelDrive } from "./enums/wheelDrive";

export class Vehicle {
    constructor(
        public id: string,
        public brand: string,
        public model: string,
        public yearOfManufacture: number,
        public vehicleClass: VehicleClass,
        public bodyColor: string,
        public bodyType: BodyType,
        public enginePower: number,
        public engineCapacity: number,
        public fuelType: FuelType,
        public wheelDrive: WheelDrive,
        public transmissionType: TransmissionType,
        public dayCost: number,
        public twoFourDaysCost: number,
        public fourSevenDaysCost: number,
        public sevenFourteenDaysCost: number,
        public fourteenAndMoreDaysCost: number,
        public mainPhoto: string,
        public photos: string[]
    ) { }
}