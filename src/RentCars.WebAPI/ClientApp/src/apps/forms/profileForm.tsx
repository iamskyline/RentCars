import { Box, Button, Grid, TextField } from "@mui/material";

export function ProfileForm() {
    return (
        <Box maxWidth="650px" bgcolor="#eaeaea"
            borderRadius={5} padding={3}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {/* ФОТА */}
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Имя пользователя"
                        variant="filled"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Кол-во арендованных ТС"
                        variant="filled"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth>
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}