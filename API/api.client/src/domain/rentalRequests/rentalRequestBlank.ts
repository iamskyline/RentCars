import { RentalStatus } from "./enums/rentalStatus";
import { RentalRequest } from "./rentalRequest";

export class RentalRequestBlank {
    constructor(
        public id: string | null,
        public userId: string | null,
        public vehicleId: string | null,
        public rentalStartDateTimeUtc: Date | null,
        public rentalEndDateTimeUtc: Date | null,
        public status: RentalStatus
    ) { }

    public static empty() {
        return new RentalRequestBlank(null, null, null, null, null, RentalStatus.Processing);
    }
}