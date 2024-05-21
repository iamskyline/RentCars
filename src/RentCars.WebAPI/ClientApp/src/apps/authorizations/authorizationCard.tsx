import { Box, Button, Grid, Link, Stack, TextField, Typography } from "@mui/material";

export function AuthorizationCard() {
    return (
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
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Введите пароль"
                        type="password"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{ width: "50%" }} variant="contained">
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
                        <Link href="/registration">
                            Создать сейчас!
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}