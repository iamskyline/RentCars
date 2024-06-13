export class VehicleLinks {
    static all = "/vehicles";
    static card = "/vehicle/:vehicleId";
    static form = "/vehicle-form/:vehicleId?";

    static toCard(vehicleId: string) {
        return `/vehicle/${vehicleId}`
    }

    static toForm(vehicleId?: string) {
        return vehicleId != null 
            ? `/vehicle-form/${vehicleId}`
            : `/vehicle-form/`
    }
}

export class RentalRequestLinks {
    static all = "/requests";
    //static card = "/request/:rentalId";
    //static form = "/request-form"

    // static toCard(rentalId: string) {
    //     return `/request/${rentalId}`
    // }
}

export class UserLinks {
    static all = "/users";
    static profile = "/profile/:userId";
    static adminProfile = "/adminProfile";

    static toProfile(userId: string) {
        return `/profile/${userId}`
    }

    static toAdminProfile(){
        return `/adminProfile`
    }
}