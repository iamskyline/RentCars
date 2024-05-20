import { Avatar, Box, Stack } from "@mui/material";
import { RegistrationCard } from "./registrationCard";
import Logo from "../../../assets/logos/Logotype.png";

export function RegistrationPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Stack direction="column" display="flex"
                alignItems="center"
                justifyContent="center"
                gap="15px">
                <img src={Logo} alt="logo"
                    width="93px" height="93px" />
                <RegistrationCard />
            </Stack>
        </Box>
    );
}