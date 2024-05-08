import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

export function RegistrationCard() {
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
                    <TextField label="Укажите свое имя"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Укажите свой телефон"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Придумайте логин"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Придумайте пароль"
                        variant="standard"
                        fullWidth
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
                        <Link href="/authorization">
                            Войти
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}