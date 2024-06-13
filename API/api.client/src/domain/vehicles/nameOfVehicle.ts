export class NameOfVehicle {
    constructor(
        public id: string,
        public brand: string,
        public model: string
    ) { }
}

export function mapToNameOfVehicle(data: any) {
    return new NameOfVehicle(
        data.id,
        data.brand,
        data.model
    );
}