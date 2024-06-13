import axios from "axios";
import { HttpClient } from "../../tools/httpClients/httpClient";
import { Result, mapToResult } from "../../tools/results/result";
import { NameOfVehicle, mapToNameOfVehicle } from "./nameOfVehicle";
import { Vehicle, mapToVehicle } from "./vehicle";
import { VehicleBlank } from "./vehicleBlank";

export class VehicleProvider {
    public static async get(vehicleId: string): Promise<Vehicle | null> {
        const any = await axios.get("/api/vehicles/get-by-id", {params: {
            vehicleId
        }})
        if (any == null) return null;

        return mapToVehicle(any);
    }

    public static async getAll(): Promise<Vehicle[]> {
        const response = await axios.get("/api/vehicles/get-all-vehicles")

        return response.data.map(mapToVehicle);
    }

    public static async getAllNameOfVehicles(): Promise<NameOfVehicle[]> {
        const response = await axios.get("/api/vehicles/get-all-vehicles")

        return response.data.map(mapToNameOfVehicle);
    }

    public static async save(vehicleBlank: VehicleBlank): Promise<Result> {
        const response = await axios.post("/api/vehicles/save", vehicleBlank)
        return mapToResult(response.data);
    }
}