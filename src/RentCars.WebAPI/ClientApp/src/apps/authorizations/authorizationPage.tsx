import { Box, Stack } from "@mui/material";
import { AuthorizationCard } from "./authorizationCard";

export function AuthorizationPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Stack direction="column">
                <img src="./assets/logos/Logotype.png" alt="logo" />
                <AuthorizationCard />
            </Stack>
        </Box>
    );
}