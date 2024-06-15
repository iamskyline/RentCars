import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { RentalStatus } from "../../../domain/rentalRequests/enums/rentalStatus";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NameOfUser } from "../../../domain/users/nameOfUser";
import { NameOfVehicle } from "../../../domain/vehicles/nameOfVehicle";
import { ConfirmationCard } from "../../confirmations/confirmationModal";
import { useState } from "react";
import { RentalRequestFormModal } from "./rentalRequestFormModal";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";

interface IProps {
    rentalRequest: RentalRequest,
    user: NameOfUser,
    vehicle: NameOfVehicle,
    onEdit: () => void,
}

export function RentalRequestCard(props: IProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    async function handleDeleteRentalRequest() {
        const response = await RentalRequestProvider.delete(props.vehicle.id)
        if (!response.isSuccess) return addErrorNotification(response.errors[0])
        addSuccessNotification('Запрос аренды успешно удалён')
        setOpenDeleteModal(false)
    }

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
                        Клиент:
                        <br />
                        {props.user.login}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h6" align="center">
                        Автомобиль:
                        <br />
                        {props.vehicle.brand} {props.vehicle.model}
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
                <Grid item xs={12} display="flex" justifyContent="space-between">
                    <IconButton color="default" sx={{ zIndex: 100 }}
                        onClick={(event) => {
                            event.stopPropagation();
                            props.onEdit();
                        }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="default" sx={{ zIndex: 100 }}
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpenDeleteModal(true);
                        }}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <ConfirmationCard
                onClose={handleDeleteModalClose}
                isOpen={openDeleteModal}
                onConfirm={handleDeleteRentalRequest}
            />
        </Box>
    );
}