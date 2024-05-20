import { Box } from "@mui/material";
import { VehicleSpecCard } from "../cards/vehicleSpecCard";

export function VehiclePage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <VehicleSpecCard />
        </Box>
    );
}