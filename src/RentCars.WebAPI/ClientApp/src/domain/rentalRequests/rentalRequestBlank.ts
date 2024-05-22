import { RentalRequest } from "./rentalRequest";

export class VehicleBlank {
    constructor(
        public id: string | null,
        public userId: string | null,
        public vehicleId: string | null,
        //public rentalStartDateTimeUtc: null,
        //public rentalEndDateTimeUtc: null,
        public status: RentalRequest | null
    ) { }

    public static empty() {
        return new VehicleBlank(null, null, null, null);
    }
}