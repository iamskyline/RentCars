import { Avatar, Box, Stack } from "@mui/material";
import { RegistrationCard } from "./registrationCard";

export function RegistrationPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Stack direction="column">
                <img src="./assets/logos/Logotype.png" alt="logo" />
                <RegistrationCard />
            </Stack>
        </Box>
    );
}