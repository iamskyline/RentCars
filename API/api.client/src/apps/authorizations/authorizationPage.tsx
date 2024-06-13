import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Logo from "../../assets/logos/Logotype.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InfrastructureProvider } from "../../domain/infrastructure/infrastructureProvider";
import { useAuthContext } from "../contexts/authContext";
import { VehicleLinks } from "../../domain/constants/links";
import { addErrorNotification } from "../../hooks/useNotifications";

interface AuthData {
    login: string | null
    password: string | null
}

const defaultAuthData: AuthData = {
    login: null,
    password: null
}

export function AuthorizationPage() {

    const [authDto, setAuthDto] = useState<AuthData>(defaultAuthData);
    const { authorize, isAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) return navigate(VehicleLinks.all)
    }, [])

    async function handleAuthButtonClick() {
        if (authDto.login == null) return;
        if (authDto.password == null) return;

        const response = await InfrastructureProvider.authorize(authDto.login, authDto.password)
        if (!response.isSuccess || response.data == null) {
            return addErrorNotification(response.errors[0])
        }

        authorize(response.data.token, response.data.isAdmin)
        navigate(VehicleLinks.all);
    }

    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Stack direction="column" display="flex"
                alignItems="center"
                justifyContent="center"
                gap="15px">
                <img src={Logo} alt="logo"
                    width="93px" height="93px" />
                <Box bgcolor="#eaeaea"
                    maxWidth="465px"
                    borderRadius={5}
                    padding={5}
                >
                    <Typography variant="h4"
                        align="center" mb={2}>
                        Добро пожаловать!
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField label="Введите логин"
                                variant="standard"
                                fullWidth
                                onChange={(e) => setAuthDto((prevState) => ({ ...prevState, login: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Введите пароль"
                                type="password"
                                variant="standard"
                                fullWidth
                                onChange={(e) => setAuthDto((prevState) => ({ ...prevState, password: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button sx={{ width: "50%" }}
                                variant="contained"
                                disabled={authDto.login == null || authDto.password == null}
                                onClick={handleAuthButtonClick}>
                                Войти
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1"
                                align="center">
                                Нет аккаунта?
                            </Typography>
                            <Typography variant="body1"
                                align="center">
                                <Link to="/registration">
                                    Создать сейчас!
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Box>
    );
}