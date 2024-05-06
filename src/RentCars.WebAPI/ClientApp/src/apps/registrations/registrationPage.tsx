import { Box } from "@mui/material";
import { RegistrationCard } from "./registrationCard";

export function RegistrationPage() {
    return (
        <Box maxWidth="485px" mx="auto"
            display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <RegistrationCard />
        </Box>
    );
}