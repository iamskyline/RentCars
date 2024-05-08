import { Avatar, Box, Grid, Typography } from "@mui/material";

export function UserCard() {
    return (
        <Box maxWidth="220px" maxHeight="285px"
            bgcolor="#eaeaea"
            borderRadius={2}
            padding={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Avatar sx={{ width: 125, height: 125 }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        Имя клиента
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        Зарегистрирован с:
                        xx.xx.20xx
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}