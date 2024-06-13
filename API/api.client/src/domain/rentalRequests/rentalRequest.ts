import { RentalStatus } from "./enums/rentalStatus";

export class RentalRequest {
    constructor(
        public id: string,
        public userId: string,
        public vehicleId: string,
        public rentalStartDateTimeUtc: Date,
        public rentalEndDateTimeUtc: Date,
        public status: RentalStatus
    ) { }
}

export function mapToRentalRequest(data: any) {
    return new RentalRequest(
        data.id,
        data.userId,
        data.vehicleId,
        new Date(data.rentalStartDateTimeUtc),
        new Date(data.rentalEndDateTimeUtc),
        data.status
    );
}