import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VehicleProvider } from "../../../domain/vehicles/vehicleProvider";
import { Vehicle } from "../../../domain/vehicles/vehicle";

export function VehicleSpecCard() {
    const { vehicleId } = useParams();

    const [vehicle, setVehicle] = useState<Vehicle | null>(null)

    useEffect(() => {
        async function loadVehicle() {
            if (vehicleId == null) return;

            const vehicle = await VehicleProvider.get(vehicleId);
            setVehicle(vehicle);
        }
        loadVehicle();
    }, [vehicleId])

    return (
        <Box maxWidth="1200px" mx="auto"
            display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box bgcolor="#eaeaea" width="100%"
                borderRadius={5}
                padding={5}>
                {
                    vehicle != null &&
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={8} container>
                            {/* ФОТА */}
                            <Grid item xs={12}>
                                <Box sx={{ width: "100%", height: "450px", bgcolor: "#737272" }}></Box>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} container>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h4">
                                    {vehicle.brand}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h5">
                                    {vehicle.model}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6">
                                    Год выпуска: {vehicle.yearOfManufacture}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6">
                                    Цвет: {vehicle.bodyColor}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6">
                                    Топливо: {vehicle.fuelType}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6">
                                    Объем двигателя: {vehicle.engineCapacity}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6">
                                    Мощность двигателя: {vehicle.enginePower}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6">
                                    Тип кузова: {vehicle.bodyType}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6">
                                    Привод: {vehicle.wheelDrive}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6">
                                    Тип КПП: {vehicle.transmissionType}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8} lg={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>1 сутки</TableCell>
                                            <TableCell align="right">2-4 суток</TableCell>
                                            <TableCell align="right">4-7 суток</TableCell>
                                            <TableCell align="right">7-14 суток</TableCell>
                                            <TableCell align="right">14 и больше суток</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {vehicle.dayCost} руб.
                                            </TableCell>
                                            <TableCell align="right">
                                                {vehicle.twoFourDaysCost} руб.
                                            </TableCell>
                                            <TableCell align="right">
                                                {vehicle.fourSevenDaysCost} руб.
                                            </TableCell>
                                            <TableCell align="right">
                                                {vehicle.sevenFourteenDaysCost} руб.
                                            </TableCell>
                                            <TableCell align="right">
                                                {vehicle.fourteenAndMoreDaysCost} руб.
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                            <Button variant="contained">
                                Арендовать
                            </Button>
                        </Grid>
                    </Grid>
                }

            </Box>
        </Box>
    );
}