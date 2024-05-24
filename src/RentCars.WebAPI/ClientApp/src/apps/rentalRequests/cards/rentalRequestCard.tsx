import { Avatar, Box, Grid, Typography } from "@mui/material";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";

export function RentalRequestCard() {
    const { rentalRequestId } = useParams();

    const [rentalRequest, setRentalRequest] = useState<RentalRequest | null>(null)

    useEffect(() => {
        async function loadRentalRequest() {
            if (rentalRequestId == null) return;

            const rentalRequest = await RentalRequestProvider.get(rentalRequestId);
            setRentalRequest(rentalRequest);
        }
        loadRentalRequest();
    }, [rentalRequestId])

    return (
        <Box maxWidth="400px"
            bgcolor="#d2d2d2"
            borderRadius={2}
            padding={2}>
            {
                rentalRequest != null &&
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
                            Статус заявки: {rentalRequest.status}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6" align="center">
                            {rentalRequest.userId}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6" align="center">
                            {rentalRequest.vehicleId}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            Дата начала аренды:
                            {rentalRequest.rentalStartDateTimeUtc.toString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            Дата окончания аренды:
                            {rentalRequest.rentalEndDateTimeUtc.toString()}
                        </Typography>
                    </Grid>
                </Grid>
            }
        </Box>
    );
}