import { Box } from "@mui/material";
import { VehicleFormCard } from "../cards/vehicleFormCard";

export function VehicleFormPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <VehicleFormCard />
        </Box>
    );
}