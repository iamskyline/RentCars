export class VehicleLinks {
    static all = "/vehicles";
    static card = "/vehicle/:vehicleId";
    static form = "/vehicle-form";

    static toCard(vehicleId: string) {
        return `/vehicle/${vehicleId}`
    }
}

export class RentalRequestLinks {
    static all = "/requests";
    static card = "/request/:rentalId";
    static form = "/request-form"

    static toCard(rentalId: string) {
        return `/request/${rentalId}`
    }
}

export class UserLinks {
    static all = "/users";
    static profile = "/profile/:userId";
    static form = "/profile-form";

    static toProfile(userId: string) {
        return `/profile/${userId}`
    }
}