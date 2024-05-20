import { RentalStatus } from "./enums/rentalStatus";

export class RentalRequest {
    constructor(
        public id: string,
        public userId: string,
        public vehicleId: string,
        //public rentalStartDateTimeUtc: null,
        //public rentalEndDateTimeUtc: null,
        public status: RentalStatus
    ) { }
}