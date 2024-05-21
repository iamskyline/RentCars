import { Avatar, Box, Grid, Typography } from "@mui/material";

export function RentalRequestCard() {
    return (
        <Box maxWidth="400px"
            bgcolor="#d2d2d2"
            borderRadius={2}
            padding={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}
                    display="flex"
                    justifyContent="center" alignItems="center">
                    <Avatar sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item xs={12} md={6} lg={6}
                    display="flex"
                    justifyContent="center" alignItems="center">
                    <Typography variant="h6" align="center">
                        Статус заявки: Активна
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h6" align="center">
                        Логин клиента
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h6" align="center">
                        Марка автомобиля
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        Дата начала аренды:
                        xx.xx.20xx
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        Дата окончания аренды:
                        xx.xx.20xx
                    </Typography>
                </Grid>

            </Grid>
        </Box>
    );
}