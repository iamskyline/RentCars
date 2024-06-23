import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { User } from "../../../domain/users/user";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { ConfirmationCard } from "../../confirmations/confirmationModal";
import { UserProvider } from "../../../domain/users/userProvider";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";

interface IProps {
    user: User
    onDelete: (userId: string) => void
    onEdit: () => void
}

export function UserCard(props: IProps) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleEditModalClose = () => setOpenEditModal(false);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    async function handleDeleteUser() {
        const response = await UserProvider.delete(props.user.id)
        if (!response.isSuccess) return addErrorNotification(response.errors[0])
        addSuccessNotification('Аккаунт пользователя успешно удалён')
        props.onDelete(props.user.id)
        setOpenDeleteModal(false)
    }

    return (
        <Box
            bgcolor="#d2d2d2"
            borderRadius={2}
            padding={2}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} display="flex" justifyContent="center">
                    {
                        props.user.avatarPath == null
                            ?
                            <Avatar sx={{ width: 125, height: 125 }} />
                            :
                            <Box sx={{
                                width: 125,
                                height: 125,
                                borderRadius: '50%',
                                backgroundImage: `url(https://localhost:7220/avatars/${props.user.avatarPath})`,
                                cursor: 'pointer',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            />
                    }
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        {props.user.login}
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
                            //setOpenEditModal(true);
                            props.onEdit()
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
            {/* <ProfileFormModal onClose={handleEditModalClose}
                isOpen={openEditModal}
                onSave={ }
                userId={props.user.id}
            /> */}
            <ConfirmationCard
                onClose={handleDeleteModalClose}
                isOpen={openDeleteModal}
                onConfirm={handleDeleteUser}
            />
        </Box>
    );
}