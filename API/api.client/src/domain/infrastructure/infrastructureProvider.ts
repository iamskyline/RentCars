import axios from "axios"
import { HttpClient } from "../../tools/httpClients/httpClient"
import DataResult, { mapToDataResult } from "../../tools/results/dataResult"
import { UserBlank } from "../users/userBlank"
import { AuthResponse } from "./authResponse"

export class InfrastructureProvider {
    public static async register(userBlank: UserBlank): Promise<DataResult<AuthResponse | null>> {
        const response = await axios.post("/api/users/registration", userBlank)

        const result = mapToDataResult<DataResult<AuthResponse | null>>(response.data)

        if (!result.data.isSuccess) {
            return DataResult.fail(result.data.errors[0])
        }

        return DataResult.success(result.data.data)
    }

    public static async authorize(login: string, password: string): Promise<DataResult<AuthResponse | null>> {
        const request = {
            login,
            password
        }

        const response = await axios.post("/api/users/authorization", request)

        const result = mapToDataResult<DataResult<AuthResponse | null>>(response.data)

        if (!result.data.isSuccess) {
            return DataResult.fail(result.data.errors[0])
        }

        return DataResult.success(result.data.data)
    }
}