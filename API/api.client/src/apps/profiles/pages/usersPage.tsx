import { Box, Grid } from "@mui/material";
import { User } from "../../../domain/users/user";
import { useEffect, useState } from "react";
import { UserProvider } from "../../../domain/users/userProvider";
import { UserCard } from "../cards/userCard";
import { UserBlank } from "../../../domain/users/userBlank";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";
import { ProfileFormModal } from "../cards/profileFormModal";

export function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        loadAllUsers();
    }, [])

    async function loadAllUsers() {
        const allUsers = await UserProvider.getAll();
        setUsers(allUsers);
    }

    async function saveUser(blank: UserBlank) {
        const saveResponse = await UserProvider.save(blank)
        if (!saveResponse.isSuccess) return addErrorNotification(saveResponse.errorsString)
        addSuccessNotification("Запрос на аренду успешно сохранён")
        loadAllUsers()
        handleCloseModal()
    }

    function handleDeleteUser(userId: string) {
        setUsers(users.filter(u => u.id != userId))
    }

    function handleEdit(userId: string) {
        setSelectedUser(userId)
        handleOpenModal()
    }

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false)
        setSelectedUser(null)
    }

    return (
        <Box sx={{
            bgcolor: "#eaeaea",
            margin: 4,
            borderRadius: 5,
            paddingX: 2,
            pb: 2
        }}>
            {isOpen &&
                <ProfileFormModal
                    isOpen={isOpen}
                    userId={selectedUser}
                    onSave={(blank) => saveUser(blank)}
                    onClose={handleCloseModal}
                />
            }
            <Grid container spacing={2}>
                {users.map(user =>
                    <Grid key={user.id} item xs={12} md={4} lg={3}>
                        <UserCard
                            user={user}
                            onDelete={handleDeleteUser}
                            onEdit={() => handleEdit(user.id)}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}