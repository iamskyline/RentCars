import { Box, Grid } from "@mui/material";
import { RentalRequestCard } from "../cards/rentalRequestCard";
import { useNavigate } from "react-router-dom";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { useEffect, useState } from "react";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import { RentalRequestLinks } from "../../../domain/constants/links";
import { VehicleProvider } from "../../../domain/vehicles/vehicleProvider";
import { Vehicle } from "../../../domain/vehicles/vehicle";
import { User } from "../../../domain/users/user";
import { NameOfUser } from "../../../domain/users/nameOfUser";
import { NameOfVehicle } from "../../../domain/vehicles/nameOfVehicle";

export function RentalRequestsPage() {
    const [rentalRequests, setRenalRequests] = useState<RentalRequest[]>([]);
    const [users, setUsers] = useState<NameOfUser[]>([]);
    const [vehicles, setVehicles] = useState<NameOfVehicle[]>([]);

    useEffect(() => {
        async function loadAllRentalRequests() {
            const allRentalRequests = await RentalRequestProvider.getAll();
            setRenalRequests(allRentalRequests.rents);
            setUsers(allRentalRequests.users);
            setVehicles(allRentalRequests.vehicles);
        }
        loadAllRentalRequests();
    }, [])

    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box maxWidth="1200px" bgcolor="#eaeaea"
                width="100%"
                borderRadius={5}
                padding={5}>
                <Grid container spacing={3}>
                    {
                        rentalRequests.map(rentalRequest => {
                            const user = users.find(u => u.id == rentalRequest.userId)!;
                            const vehicle = vehicles.find(u => u.id == rentalRequest.vehicleId)!;

                            return (
                                <Grid key={rentalRequest.id} item xs={12} md={4} lg={4}
                                    sx={{ zIndex: 10 }}
                                    display="flex" justifyContent="center"
                                    alignItems="center">
                                    <RentalRequestCard rentalRequest={rentalRequest} user={user} vehicle={vehicle} />
                                </Grid>
                            )
                        }
                        )}
                </Grid>
            </Box>
        </Box>
    );
}