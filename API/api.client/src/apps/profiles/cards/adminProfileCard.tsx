import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { UserProvider } from "../../../domain/users/userProvider";
import { useEffect, useState } from "react";
import { User } from "../../../domain/users/user";
import { useAuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "../../../domain/vehicles/vehicle";
import { VehicleLinks } from "../../../domain/constants/links";

export function AdminProfileCard() {
    const { userId } = useAuthContext();

    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            if (userId == null) return;

            const user = await UserProvider.get(userId);
            setUser(user);
        }
        loadUser();
    }, [userId])

    return (
        <Box maxWidth="1200px" bgcolor="#eaeaea"
            width="100%"
            borderRadius={5}
            padding={5}>
            {
                user != null &&
                <Grid container spacing={3}>
                    <Grid item xs={12} container spacing={1}>
                        <Grid item xs={12} md={3} lg={2}>
                            <Avatar sx={{ width: 150, height: 150 }} />
                        </Grid>
                        <Grid item xs={10} md={5} lg={6}>
                            <Box>
                                <Typography variant="h5">
                                    {user.name}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={4} lg={4}>
                            <Box width="100%" display="flex"
                                alignItems="flex-start" justifyContent="flex-end">
                                <IconButton aria-label="logout">
                                    <LogoutIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Box>
    );
}