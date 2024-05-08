import { Box } from "@mui/material";
import { AdminProfileCard } from "../Cards/adminProfileCard";

export function ProfilePage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <AdminProfileCard />
        </Box>
    );
}