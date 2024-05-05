import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

export function Registration() {
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
                            Будем рады знакомству!
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id="standard-basic"
                            label="Укажите свое имя"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id="standard-basic"
                            label="Укажите свой телефон"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id="standard-basic"
                            label="Придумайте логин"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id="standard-basic"
                            label="Придумайте пароль"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained"
                            fullWidth>
                            Зарегистрироваться
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
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
        </Box>
    );
}