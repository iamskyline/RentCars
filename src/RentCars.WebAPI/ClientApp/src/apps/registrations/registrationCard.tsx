import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { UserBlank } from "../../domain/users/userBlank";

export function RegistrationCard() {
    const [userBlank, setUserBlank] = useState<UserBlank>(UserBlank.empty());

    return (
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
                        value={userBlank.password ?? undefined}
                        onChange={(event) => {
                            setUserBlank(prev => ({ ...prev, password: event.target.value }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Button variant="contained"
                        fullWidth>
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
                        <Link href="/">
                            Войти
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}