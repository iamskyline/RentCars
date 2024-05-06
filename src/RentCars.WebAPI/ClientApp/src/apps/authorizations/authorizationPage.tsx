import { Box } from "@mui/material";
import { AuthorizationCard } from "./authorizationCard";

export function AuthorizationPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <AuthorizationCard />
        </Box>
    );
}