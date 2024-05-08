import { Box } from "@mui/material";
import { VehicleSpecCard } from "../Cards/vehicleSpecCard";

export function VehiclePage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <VehicleSpecCard />
        </Box>
    );
}