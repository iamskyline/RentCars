import { Box } from "@mui/material";
import { ProfileFormCard } from "../cards/profileFormCard";

export function ProfileFormPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <ProfileFormCard />
        </Box>
    );
}