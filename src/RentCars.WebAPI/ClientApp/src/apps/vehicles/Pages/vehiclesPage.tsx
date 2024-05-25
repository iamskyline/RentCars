import { Box, Grid } from "@mui/material";
import { VehicleCard } from "../cards/vehicleCard";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "../../../domain/vehicles/vehicle";
import { useEffect, useState } from "react";
import { VehicleProvider } from "../../../domain/vehicles/vehicleProvider";
import { VehicleLinks } from "../../../domain/constants/links";

export function VehiclesPage() {
    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        async function loadAllVehicles() {
            const allVehicles = await VehicleProvider.getAll();
            setVehicles(allVehicles);
        }
        loadAllVehicles();
    }, [])

    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box maxWidth="1200px" bgcolor="#eaeaea"
                width="100%"
                borderRadius={5}
                padding={5}>
                <Grid container spacing={3}>
                    {vehicles.map(vehicle =>
                        <Grid key={vehicle.id} item xs={12} md={4} lg={3}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate(VehicleLinks.toCard(vehicle.id))}
                            display="flex" justifyContent="center"
                            alignItems="center">
                            <VehicleCard vehicle={vehicle} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}