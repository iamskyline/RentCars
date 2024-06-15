import { Box, Grid } from "@mui/material";
import { User } from "../../../domain/users/user";
import { useEffect, useState } from "react";
import { UserProvider } from "../../../domain/users/userProvider";
import { UserCard } from "../cards/userCard";

export function UsersPage() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function loadAllUsers() {
            const allUsers = await UserProvider.getAll();
            setUsers(allUsers);
        }
        loadAllUsers();
    }, [])

    function handleDeleteUser(userId: string) {
        setUsers(users.filter(u => u.id != userId))
    }

    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box maxWidth="1200px" bgcolor="#eaeaea"
                width="100%"
                borderRadius={5}
                padding={5}>
                <Grid container spacing={3}>
                    {users.map(user =>
                        <Grid key={user.id} item xs={12} md={4} lg={3}
                            sx={{ zIndex: 10 }}>
                            <UserCard user={user} onDelete={handleDeleteUser} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}