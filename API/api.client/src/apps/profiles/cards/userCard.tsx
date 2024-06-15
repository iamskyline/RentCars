import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { User } from "../../../domain/users/user";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserLinks } from "../../../domain/constants/links";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProfileFormModal } from "./profileFormModal";
import { ConfirmationCard } from "../../confirmations/confirmationModal";
import { UserProvider } from "../../../domain/users/userProvider";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";

interface IProps {
    user: User
}

export function UserCard(props: IProps) {
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleEditModalClose = () => setOpenEditModal(false);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    async function handleDeleteUser() {
        const response = await UserProvider.delete(props.user.id)
        if (!response.isSuccess) return addErrorNotification(response.errors[0])
        addSuccessNotification('Запрос аренды успешно удалён')
    }

    return (
        <Box maxWidth="220px"
            bgcolor="#d2d2d2"
            borderRadius={2}
            padding={2}
        >
            <Grid container spacing={3}
                onClick={() => navigate(UserLinks.toProfile(props.user.id))}>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Avatar sx={{ width: 125, height: 125 }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        {props.user.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        Зарегистрирован
                    </Typography>
                    <Typography variant="h6" align="center">
                        {props.user.registrationDate.toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="space-between">
                    <IconButton color="default" sx={{ zIndex: 100 }}
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpenEditModal(true);
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
            <ProfileFormModal onClose={handleEditModalClose} isOpen={openEditModal} user={props.user} />
            <ConfirmationCard
                onClose={handleDeleteModalClose}
                isOpen={openDeleteModal}
                onConfirm={handleDeleteUser}
            />
        </Box>
    );
}