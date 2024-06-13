import { Box } from "@mui/material";
import { VehicleFormCard } from "../cards/vehicleFormCard";

export function VehicleFormPage() {
    return (
        <Box display="flex" justifyContent="center" pt={2}>
            <VehicleFormCard />
        </Box>
    );
}