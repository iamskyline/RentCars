import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { RentalStatus } from "../../../domain/rentalRequests/enums/rentalStatus";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NameOfUser } from "../../../domain/users/nameOfUser";
import { NameOfVehicle } from "../../../domain/vehicles/nameOfVehicle";
import { ConfirmationCard } from "../../confirmations/confirmationModal";
import { useEffect, useState } from "react";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";
import { User } from "../../../domain/users/user";
import { UserProvider } from "../../../domain/users/userProvider";

interface IProps {
    rentalRequest: RentalRequest
    user: NameOfUser
    vehicle: NameOfVehicle
    onEdit: () => void
    onDelete: (rentalRequestId: string) => void
}

export function RentalRequestCard(props: IProps) {
    const [user, setUser] = useState<User>()
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    async function handleDeleteRentalRequest() {
        const response = await RentalRequestProvider.delete(props.rentalRequest.id)
        if (!response.isSuccess) return addErrorNotification(response.errors[0])
        addSuccessNotification('Запрос аренды успешно удалён')
        props.onDelete(props.rentalRequest.id)
        setOpenDeleteModal(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    async function loadUser() {
        const user = await UserProvider.get(props.user.id)
        setUser(user!)
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
                    {
                        user?.avatarPath == null
                            ?
                            <Avatar sx={{ width: 100, height: 100 }} />
                            :
                            <Box sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                backgroundImage: `url(https://localhost:7220/avatars/${user!.avatarPath})`,
                                cursor: 'pointer',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            />
                    }
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
                        {props.user.login ?? "Удаленный профиль"}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h6" align="center"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        Автомобиль:
                        <br />
                        {props.vehicle.brand ?? "Удаленны авто"} {props.vehicle.model ?? "Удаленный авто"}
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