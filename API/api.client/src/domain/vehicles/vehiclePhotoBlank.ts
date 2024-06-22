import { VehiclePhoto } from "./vehiclePhoto";

export class VehiclePhotoBlank {
    constructor(
        public id: string,
        public vehicleid: string,
        public path: string,
        public isDeleted: boolean,
    ) { }
    
    public static fromDomain(vehiclePhotos: VehiclePhoto[]) {
        return vehiclePhotos.map(ph => new VehiclePhotoBlank(ph.id, ph.vehicleid, ph.path, false))
    }
}
