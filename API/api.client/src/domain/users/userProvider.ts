import axios from "axios";
import { NameOfUser, mapToNameOfUser } from "./nameOfUser";
import { User, mapToUser } from "./user";
import { Result, mapToResult } from "../../tools/results/result";

export class UserProvider {
    public static async get(userId: string): Promise<User | null> {
        const response = await axios.get("/api/users/get-user-by-id", {
            params: {
                userId
            }
        })
        if (response.data == null) return null;

        return mapToUser(response.data);
    }

    public static async getQuantityRentedVehicles(userId: string): Promise<number | null> {
        const response = await axios.get("/api/users/get-quantity-rented-vehicles-by-userid", {
            params: {
                userId
            }
        })
        if (response.data == null) return null;

        return response.data;
    }

    public static async getAll(): Promise<User[]> {
        const response = await axios.get("/api/users/get-all-users")

        return response.data.map(mapToUser);
    }

    public static async getAllClients(): Promise<NameOfUser[]> {
        const response = await axios.get("/api/users/get-all-clients")

        return response.data.map(mapToNameOfUser);
    }

    public static async delete(id: string): Promise<Result> {
        const response = await axios.get("/api/users/remove-account", {
            params: {
                id
            }
        })

        return mapToResult(response.data)
    }
}