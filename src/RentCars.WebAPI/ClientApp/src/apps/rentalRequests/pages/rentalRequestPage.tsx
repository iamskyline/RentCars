import { Box } from "@mui/material";
import { RentalRequestCard } from "../cards/rentalRequestCard";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import { useEffect, useState } from "react";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { useParams } from "react-router-dom";
import { User } from "../../../domain/users/user";
import { UserProvider } from "../../../domain/users/userProvider";
import { Vehicle } from "../../../domain/vehicles/vehicle";
import { VehicleProvider } from "../../../domain/vehicles/vehicleProvider";

export function RentalRequestPage() {
    const { rentalId } = useParams();

    const [rentalRequest, setRentalRequest] = useState<RentalRequest | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        async function loadRentalRequest() {
            if (rentalId == null) return;

            const rentalRequest = await RentalRequestProvider.get(rentalId);
            setRentalRequest(rentalRequest);

            const user = await UserProvider.get(rentalRequest!.userId);
            setUser(user);

            const vehicle = await VehicleProvider.get(rentalRequest!.vehicleId);
            setVehicle(vehicle);
        }
        loadRentalRequest();
    }, [rentalId])

    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            {
                rentalRequest != null && user != null && vehicle != null &&
                <RentalRequestCard rentalRequest={rentalRequest}
                    user={user}
                    vehicle={vehicle}
                />
            }
        </Box>
    );
}