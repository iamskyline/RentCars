import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../domain/users/user";
import { UserProvider } from "../../../domain/users/userProvider";

export function ClientProfileCard() {
    const { userId } = useParams();

    const [user, setUser] = useState<User | null>(null)
    const [vehiclesQuantity, setVehiclesQuantity] = useState<number | null>(null)

    useEffect(() => {
        async function loadUser() {
            if (userId == null) return;

            const user = await UserProvider.get(userId);
            setUser(user);

            const rentedVehiclesQuantity = await UserProvider.getQuantityRentedVehicles(userId);
            setVehiclesQuantity(rentedVehiclesQuantity);
        }
        loadUser();
    }, [userId])

    return (
        <Box maxWidth="1200px" bgcolor="#eaeaea" width="100%"
            borderRadius={5}
            padding={5}>
            {
                user != null &&
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={2}>
                        <Avatar sx={{ width: 150, height: 150 }} />
                    </Grid>
                    <Grid item xs={11} md={8} lg={9}>
                        <Typography variant="h5"
                            mb={1}>
                            {user.name}
                        </Typography>
                        <Typography variant="body1"
                            mb={1}>
                            На сайте с: {user.registrationDate.toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1"
                            mb={1}>
                            Количество арендованных автомобилей: {vehiclesQuantity}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={1} lg={1}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-start">
                        <IconButton aria-label="logout">
                            <LogoutIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            }
        </Box>
    );
}