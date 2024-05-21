import { Avatar, Box, Button, Grid, TextField } from "@mui/material";

export function ProfileForm() {
    return (
        <Box maxWidth="650px" bgcolor="#eaeaea"
            borderRadius={5} padding={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} display="flex" justifyContent="center">
                    {/* ФОТА */}
                    <Avatar sx={{ width: 200, height: 200 }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Имя пользователя"
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Кол-во арендованных ТС"
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained">
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}