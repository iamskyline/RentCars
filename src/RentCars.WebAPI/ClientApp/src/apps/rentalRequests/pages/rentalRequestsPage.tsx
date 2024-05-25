import { Box, Grid } from "@mui/material";
import { RentalRequestCard } from "../cards/rentalRequestCard";
import { useNavigate } from "react-router-dom";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { useEffect, useState } from "react";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import { RentalRequestLinks } from "../../../domain/constants/links";

export function RentalRequestsPage() {
    const navigate = useNavigate();

    const [rentalRequests, setRenalRequests] = useState<RentalRequest[]>([]);

    useEffect(() => {
        async function loadAllRentalRequests() {
            const allRentalRequests = await RentalRequestProvider.getAll();
            setRenalRequests(allRentalRequests);
        }
        loadAllRentalRequests();
    }, [])

    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box maxWidth="1200px" bgcolor="#eaeaea"
                width="100%"
                borderRadius={5}
                padding={5}>
                <Grid container spacing={3}>
                    {
                        rentalRequests.map(rentalRequest =>
                            <Grid key={rentalRequest.id} item xs={12} md={4} lg={4}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(RentalRequestLinks.toCard(rentalRequest.id))}
                                display="flex" justifyContent="center"
                                alignItems="center">
                                <RentalRequestCard rentalRequest={rentalRequest} />
                            </Grid>
                        )}
                </Grid>
            </Box>
        </Box>
    );
}