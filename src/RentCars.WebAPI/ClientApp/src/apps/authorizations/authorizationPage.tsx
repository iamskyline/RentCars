import { Box, Stack } from "@mui/material";
import { AuthorizationCard } from "./authorizationCard";
import Logo from "../../../assets/logos/Logotype.png";

export function AuthorizationPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Stack direction="column" display="flex"
                alignItems="center"
                justifyContent="center"
                gap="15px">
                <img src={Logo} alt="logo"
                    width="93px" height="93px" />
                <AuthorizationCard />
            </Stack>
        </Box>
    );
}