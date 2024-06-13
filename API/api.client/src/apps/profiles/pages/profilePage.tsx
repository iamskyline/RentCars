import { Box } from "@mui/material";
import { AdminProfileCard } from "../cards/adminProfileCard";
import { ClientProfileCard } from "../cards/clientProfileCard";

export function ProfilePage() {

    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            {/* <AdminProfileCard /> */}
            <ClientProfileCard />
        </Box>
    );
}