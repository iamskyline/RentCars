import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Logo from "../../assets/logos/Logotype.png";
import { Link, useNavigate } from "react-router-dom";
import { MuiTelInput } from "mui-tel-input";
import { VehicleLinks } from "../../domain/constants/links";
import { UserBlank } from "../../domain/users/userBlank";
import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { InfrastructureProvider } from "../../domain/infrastructure/infrastructureProvider";
import { addErrorNotification, addSuccessNotification } from "../../hooks/useNotifications";

export function RegistrationPage() {
    const { authorize } = useAuthContext()
    const navigate = useNavigate();
    const [userBlank, setUserBlank] = useState<UserBlank>(UserBlank.empty());

    async function save() {
        const result = await InfrastructureProvider.register(userBlank);
        if (!result.isSuccess || result.data == null) return addErrorNotification(result.errors[0]);
        authorize(result.data.token, result.data.isAdmin)

        navigate(VehicleLinks.all);
        return addSuccessNotification("Вы успешно зарегистрировались!")
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
                <Box maxWidth="485px" bgcolor="#eaeaea"
                    borderRadius={5}
                    padding={5}>
                    <Typography variant="h4"
                        align="center" mb={2}>
                        Будем рады знакомству!
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <MuiTelInput fullWidth defaultCountry="RU" disableDropdown
                                value={userBlank.tel ?? undefined}
                                error={userBlank.tel == null}
                                onChange={(tel) => {
                                    setUserBlank(prev => ({ ...prev, tel }));
                                }}
                                inputProps={{
                                    maxLength: 16
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Укажите свое имя"
                                variant="standard"
                                fullWidth
                                error={userBlank.name == null}
                                value={userBlank.name ?? undefined}
                                onChange={(event) => {
                                    setUserBlank(prev => ({ ...prev, name: event.target.value }));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Придумайте логин"
                                variant="standard"
                                fullWidth
                                error={userBlank.login == null}
                                value={userBlank.login ?? undefined}
                                onChange={(event) => {
                                    setUserBlank(prev => ({ ...prev, login: event.target.value }));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Придумайте пароль"
                                variant="standard"
                                type="password"
                                fullWidth
                                error={userBlank.password == null}
                                value={userBlank.password ?? undefined}
                                onChange={(event) => {
                                    setUserBlank(prev => ({ ...prev, password: event.target.value }));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Button variant="contained"
                                fullWidth onClick={save}>
                                Зарегистрироваться
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Typography variant="body1"
                                align="center">
                                Уже есть аккаунт?
                            </Typography>
                            <Typography variant="body1"
                                align="center">
                                <Link to="/">
                                    Войти
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Box>
    );
}