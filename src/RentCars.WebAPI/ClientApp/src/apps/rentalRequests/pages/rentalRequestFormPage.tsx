import { Box } from "@mui/material";
import { RentalRequestForm } from "../cards/rentalRequestForm";

export function RentalRequestFormPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <RentalRequestForm />
        </Box>
    );
}