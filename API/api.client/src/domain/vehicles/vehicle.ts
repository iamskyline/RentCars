import { BodyType } from "./enums/bodyType";
import { FuelType } from "./enums/fuelType";
import { TransmissionType } from "./enums/transmissionType";
import { VehicleClass } from "./enums/vehicleClass";
import { WheelDrive } from "./enums/wheelDrive";
import { VehiclePhoto, mapToVehiclePhotos } from "./vehiclePhoto";

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
        public photos: VehiclePhoto[]
    ) { }
}

export function mapToVehicle(data: any) {

    const photos = mapToVehiclePhotos(data.photos)

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
        photos,
    );
}