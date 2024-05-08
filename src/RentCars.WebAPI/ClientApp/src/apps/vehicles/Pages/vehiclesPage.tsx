import { Box, Grid } from "@mui/material";
import { VehicleCard } from "../Cards/vehicleCard";

export function VehiclesPage() {
    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box maxWidth="1200px" bgcolor="#eaeaea"
                width="100%"
                borderRadius={5}
                padding={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>

                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>

                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}
                        display="flex" justifyContent="center"
                        alignItems="center">
                        <VehicleCard />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}