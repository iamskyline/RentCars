import { HttpClient } from "../../tools/httpClients/httpClient";
import { NameOfUser, mapToNameOfUser } from "../users/nameOfUser";
import { User, mapToUser } from "../users/user";
import { NameOfVehicle, mapToNameOfVehicle } from "../vehicles/nameOfVehicle";
import { RentalRequest, mapToRentalRequest } from "./rentalRequest";

export class RentalRequestProvider {
    public static async get(rentalRequestId: string): Promise<RentalRequest | null> {
        const any = await HttpClient.get("/api/rental-request/get-by-id", { rentalRequestId })
        if (any == null) return null;

        return mapToRentalRequest(any);
    }

    public static async getAll(): Promise<{ rents: RentalRequest[], users: NameOfUser[], vehicles: NameOfVehicle[] }> {
        const any = await HttpClient.get("/api/rental-request/get-all-rental-requests")

        const rents = (any.rents as any[]).map(mapToRentalRequest);
        const users = (any.users as any[]).map(mapToNameOfUser);
        const vehicles = (any.vehicles as any[]).map(mapToNameOfVehicle);

        return { rents, users, vehicles };
    }
}