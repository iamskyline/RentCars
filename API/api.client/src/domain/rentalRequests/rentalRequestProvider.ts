import axios from "axios";
import { NameOfUser, mapToNameOfUser } from "../users/nameOfUser";
import { NameOfVehicle, mapToNameOfVehicle } from "../vehicles/nameOfVehicle";
import { RentalRequest, mapToRentalRequest } from "./rentalRequest";

export class RentalRequestProvider {
    public static async get(rentalRequestId: string): Promise<RentalRequest | null> {
        const response = await axios.get("/api/rental-request/get-by-id", { params: {
            rentalRequestId
        }})
        if (response.data == null) return null;

        return mapToRentalRequest(response.data);
    }

    public static async getAll(): Promise<{ rents: RentalRequest[], users: NameOfUser[], vehicles: NameOfVehicle[] }> {
        const response = await axios.get("/api/rental-request/get-all-rental-requests")

        const rents = (response.data.rents as any[]).map(mapToRentalRequest);
        const users = (response.data.users as any[]).map(mapToNameOfUser);
        const vehicles = (response.data.vehicles as any[]).map(mapToNameOfVehicle);

        return { rents, users, vehicles };
    }
}