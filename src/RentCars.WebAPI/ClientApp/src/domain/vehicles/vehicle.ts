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
        public vehicleClass: string,
        public bodyColor: string,
        public bodyType: string,
        public enginePower: number,
        public engineCapacity: number,
        public fuelType: string,
        public wheelDrive: string,
        public transmissionType: string,
        public dayCost: number,
        public twoFourDaysCost: number,
        public fourSevenDaysCost: number,
        public sevenFourteenDaysCost: number,
        public fourteenAndMoreDaysCost: number,
        public mainPhoto: string,
        public photos: string[]
    ) { }
}

export function mapToVehicle(data: any) {
    return new Vehicle(
        data.id,
        data.brand,
        data.model,
        data.yearOfManufacture,
        data.vehicleClass,
        data.bodyColor,
        data.bodyType,
        data.enginePower,
        data.engineCapacity,
        data.fuelType,
        data.wheelDrive,
        data.transmissionType,
        data.dayCost,
        data.twoFourDaysCost,
        data.fourSevenDaysCost,
        data.sevenFourteenDaysCost,
        data.fourteenAndMoreDaysCost,
        data.mainPhoto,
        data.photos,
    );
}