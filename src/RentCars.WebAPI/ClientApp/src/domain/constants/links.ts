export class VehicleLinks {
    static all = "/vehicles";
    static card = "/vehicle-card/:vehicleId";

    static toCard(vehicleId: string) {
        return `/vehicle-card/${vehicleId}`
    }
}

export class RentalRequestLinks {
    static all = "/requests";
    static card = "/request-card/:rentalId";

    static toCard(rentalId: string) {
        return `/request-card/${rentalId}`
    }
}