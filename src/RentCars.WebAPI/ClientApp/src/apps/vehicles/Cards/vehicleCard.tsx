import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Vehicle } from "../../../domain/vehicles/vehicle";
import axios from "axios";

interface IProps {
    vehicle: Vehicle
}

export function VehicleCard(props: IProps) {
    return (
        <Box maxWidth="220px"
            bgcolor="#d2d2d2"
            borderRadius={2}
            padding={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* ФОТА ТУТ */}
                    <Box sx={{ width: "100%", height: "140px", bgcolor: "#737272" }}></Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4"
                        align="center">
                        {props.vehicle.brand}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5"
                        align="center">
                        {props.vehicle.model}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6"
                        align="center">
                        {props.vehicle.engineCapacity} л.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6"
                        align="center">
                        {props.vehicle.enginePower} л.с.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"
                        align="center">
                        {props.vehicle.fuelType}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"
                        align="center">
                        {props.vehicle.yearOfManufacture}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}