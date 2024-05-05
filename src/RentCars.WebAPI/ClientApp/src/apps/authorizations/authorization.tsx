import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

export function Authorization() {
    return (
        <Box maxWidth="485px" mx="auto"
            display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box bgcolor="#eaeaea"
                borderRadius={5}
                padding={5}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h4"
                            align="center">
                            Добро пожаловать!
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id="standard-basic"
                            label="Введите логин"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id="standard-password-input"
                            label="Введите пароль"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained"
                            fullWidth>
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
        </Box>
    );
}