import { Box } from "@mui/material";
import { RentalRequestCard } from "../cards/rentalRequestCard";

export function RentalRequestPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <RentalRequestCard />
        </Box>
    );
}