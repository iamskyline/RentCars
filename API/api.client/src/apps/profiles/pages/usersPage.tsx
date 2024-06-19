import { Box, Grid } from "@mui/material";
import { User } from "../../../domain/users/user";
import { useEffect, useState } from "react";
import { UserProvider } from "../../../domain/users/userProvider";
import { UserCard } from "../cards/userCard";

export function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        loadAllUsers();
    }, [])

    async function loadAllUsers() {
        const allUsers = await UserProvider.getAll();
        setUsers(allUsers);
    }

    function handleDeleteUser(userId: string) {
        setUsers(users.filter(u => u.id != userId))
    }

    return (
        <Box sx={{
            bgcolor: "#eaeaea",
            margin: 4,
            borderRadius: 5,
            paddingX: 2,
            pb: 2
        }}>
            <Grid container spacing={2}>
                {users.map(user =>
                    <Grid key={user.id} item xs={12} md={4} lg={3}>
                        <UserCard user={user} onDelete={handleDeleteUser} />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}