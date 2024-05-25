import { Box } from "@mui/material";
import { RentalRequestCard } from "../cards/rentalRequestCard";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import { useEffect, useState } from "react";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { useParams } from "react-router-dom";

export function RentalRequestPage() {
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
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            {
                rentalRequest != null &&
                <RentalRequestCard rentalRequest={rentalRequest} />
            }
        </Box>
    );
}