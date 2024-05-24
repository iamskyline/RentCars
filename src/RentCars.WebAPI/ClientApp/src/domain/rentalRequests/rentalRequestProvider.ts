import { HttpClient } from "../../tools/httpClients/httpClient";
import { RentalRequest, mapToRentalRequest } from "./rentalRequest";

export class RentalRequestProvider {
    public static async get(rentalRequestId: string): Promise<RentalRequest | null> {
        const any = await HttpClient.get("/api/rental-request/get-by-id", { rentalRequestId })
        if (any == null) return null;

        return mapToRentalRequest(any);
    }

    public static async getAll(): Promise<RentalRequest[]> {
        const any = await HttpClient.get("/api/rental-request/get-all-rental-requests")

        return (any as any[]).map(mapToRentalRequest);
    }
}