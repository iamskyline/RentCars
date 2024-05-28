import { HttpClient } from "../../tools/httpClients/httpClient";
import { Result, mapToResult } from "../../tools/results/result";
import { Vehicle, mapToVehicle } from "./vehicle";
import { VehicleBlank } from "./vehicleBlank";

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

    // public static async getByIds(vehicleIds: string[]): Promise<Vehicle[]> {
    //     const any = await HttpClient.get("/api/vehicles/get-vehicles-by-ids", {
    //         params: { ids: vehicleIds }
    //     });

    //     return mapToVehicles(any);
    // }

    public static async save(vehicleBlank: VehicleBlank): Promise<Result> {
        const any = await HttpClient.post("/api/vehicles/save", vehicleBlank)
        return mapToResult(any);
    }
}