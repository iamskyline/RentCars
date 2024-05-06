import { Box, Button, Grid, Link, Stack, TextField, Typography } from "@mui/material";

export function AuthorizationCard() {
    return (
        <Box bgcolor="#eaeaea"
            maxWidth="465px"
            borderRadius={5}
            padding={5}
        >
            <Stack direction='column' gap={1}>
                <Typography variant="h4"
                    align="center">
                    Добро пожаловать!
                </Typography>
                <TextField label="Введите логин"
                    variant="standard"
                    fullWidth
                />
                <TextField label="Введите пароль"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    fullWidth
                />
                <Stack gap={1} direction='row' mt={3}>
                    <Button sx={{ width: "50%" }} variant="contained">
                        Войти
                    </Button>
                    <Box width="50%">
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
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
}