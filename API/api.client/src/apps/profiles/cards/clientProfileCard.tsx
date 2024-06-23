import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../domain/users/user";
import { UserProvider } from "../../../domain/users/userProvider";
import { useAuthContext } from "../../contexts/authContext";

export function ClientProfileCard() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const { logout } = useAuthContext();


    const [user, setUser] = useState<User | null>(null)
    const [vehiclesQuantity, setVehiclesQuantity] = useState<number | null>(null)

    async function handleLogout() {
        await logout()
        navigate('/')
    }

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
        <Box display="flex" justifyContent="center">
            <Box maxWidth="1200px" bgcolor="#eaeaea" width="100%"
                borderRadius={5}
                padding={5}
                mt={4}>
                {
                    user != null &&
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3} lg={2}>
                            {
                                user.avatarPath == null
                                    ?
                                    <Avatar sx={{ width: 150, height: 150 }} />
                                    :
                                    <Box sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: '50%',
                                        backgroundImage: `url(https://localhost:7220/avatars/${user!.avatarPath})`,
                                        cursor: 'pointer',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    />
                            }
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
                                Количество запросов на аренду: {vehiclesQuantity}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-start">
                            <IconButton aria-label="logout" onClick={handleLogout}>
                                <LogoutIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                }
            </Box>
        </Box>
    );
}