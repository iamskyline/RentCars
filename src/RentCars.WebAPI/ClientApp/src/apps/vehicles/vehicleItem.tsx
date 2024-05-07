import { Avatar, Box, Grid, Typography } from "@mui/material";

export function VehicleItem() {
    return (
        <Box maxWidth="220px"
            bgcolor="#eaeaea"
            borderRadius={2}
            padding={2}>
            <Grid container>
                <Grid item xs={12}>
                    {/* ФОТА ТУТ */}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1"
                        align="center">
                        BMW
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2"
                        align="center">
                        5 серии 530d
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle2"
                        align="center">
                        3.0 л.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle2"
                        align="center">
                        249 л.с.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2"
                        align="center">
                        Бензин
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2"
                        align="center">
                        2018
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}