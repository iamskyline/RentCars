export class VehiclePhoto{
    constructor(
        public id: string,
        public vehicleid: string,
        public path: string
    ) {
    }
}

export function mapToVehiclePhoto(data: any){
    return new VehiclePhoto(data.id, data.vehicleid, data.path)
}

export function mapToVehiclePhotos(data: any[]){
    return data.map(d => mapToVehiclePhoto(d))
}