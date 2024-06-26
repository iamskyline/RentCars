import axios from "axios";
import { Result, mapToResult } from "../../tools/results/result";
import { NameOfVehicle, mapToNameOfVehicle } from "./nameOfVehicle";
import { Vehicle, mapToVehicle } from "./vehicle";
import { VehicleBlank } from "./vehicleBlank";

export class VehicleProvider {
    public static async get(vehicleId: string): Promise<Vehicle | null> {
        const response = await axios.get("/api/vehicles/get-by-id", {params: {
            vehicleId
        }})
        if (response.data == null) return null;

        return mapToVehicle(response.data);
    }

    public static async getAll(): Promise<Vehicle[]> {
        const response = await axios.get("/api/vehicles/get-all-vehicles")

        return response.data.map(mapToVehicle);
    }

    public static async getAllNameOfVehicles(): Promise<NameOfVehicle[]> {
        const response = await axios.get("/api/vehicles/get-all-vehicles")

        return response.data.map(mapToNameOfVehicle);
    }

    public static async save(blank: VehicleBlank, photos: File[]): Promise<Result> {
        const vehicleBlank = new FormData()

        vehicleBlank.append('blank', JSON.stringify(blank))
    
        if(photos != null) {
            photos.forEach((photo) => {
                vehicleBlank.append('photos', photo);
            });
        }

        const response = await axios.post("/api/vehicles/save", vehicleBlank, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return mapToResult(response.data);
    }

    public static async delete(id: string): Promise<Result> {
        const response = await axios.get("/api/vehicles/remove", {
            params: {
                id
            }
        })

        return mapToResult(response.data)
    }
}