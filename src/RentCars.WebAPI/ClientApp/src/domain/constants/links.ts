export class VehicleLinks {
    static all = "/vehicles";
    static card = "/vehicle-card/:vehicleId";

    static toCard(vehicleId: string) {
        return `/vehicle-card/${vehicleId}`
    }
}