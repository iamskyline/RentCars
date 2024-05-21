import { HttpClient } from "../../tools/httpClients/httpClient";
import { Vehicle, mapToVehicle } from "./vehicle";

export class VehicleProvider {
    public static async get(vehicleId: string): Promise<Vehicle | null> {
        const any = await HttpClient.get("/api/vehicles/get-by-id", { vehicleId })
        if (any == null) return null;

        return mapToVehicle(any);
    }

    public static async getAll(): Promise<Vehicle[]> {
        const any = await HttpClient.get("/api/vehicles/get-all-vehicles")

        return (any as any[]).map(mapToVehicle);
    }
}