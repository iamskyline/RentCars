import { HttpClient } from "../../tools/httpClients/httpClient";
import { Vehicle } from "../vehicles/vehicle";
import { NameOfUser, mapToNameOfUser } from "./nameOfUser";
import { User, mapToUser } from "./user";

export class UserProvider {
    public static async get(userId: string): Promise<User | null> {
        const any = await HttpClient.get("/api/users/get-user-by-id", { userId })
        if (any == null) return null;

        return mapToUser(any);
    }

    public static async getQuantityRentedVehicles(userId: string): Promise<number | null> {
        const any = await HttpClient.get("/api/users/get-quantity-rented-vehicles-by-userid", { userId })
        if (any == null) return null;

        return any;
    }

    public static async getAll(): Promise<User[]> {
        const any = await HttpClient.get("/api/users/get-all-users")

        return (any as any[]).map(mapToUser);
    }

    public static async getAllClients(): Promise<NameOfUser[]> {
        const any = await HttpClient.get("/api/users/get-all-clients")

        return (any as any[]).map(mapToNameOfUser);
    }
}