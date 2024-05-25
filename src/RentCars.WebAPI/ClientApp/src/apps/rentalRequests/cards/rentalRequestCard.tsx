import { Avatar, Box, Grid, Typography } from "@mui/material";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import { RentalStatus } from "../../../domain/rentalRequests/enums/rentalStatus";

interface IProps {
    rentalRequest: RentalRequest
}

export function RentalRequestCard(props: IProps) {
    console.log(props.rentalRequest)
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
                        Статус заявки: {RentalStatus.getDisplayName(props.rentalRequest.status)}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h6" align="center">
                        {props.rentalRequest.userId}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h6" align="center">
                        {props.rentalRequest.vehicleId}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        Дата начала аренды:
                    </Typography>
                    <Typography variant="h6" align="center">
                        {props.rentalRequest.rentalStartDateTimeUtc.toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        Дата окончания аренды:
                    </Typography>
                    <Typography variant="h6" align="center">
                        {props.rentalRequest.rentalEndDateTimeUtc.toLocaleDateString()}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}