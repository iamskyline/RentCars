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
        <Box display="flex"
            flexDirection={'column'}
            alignItems={'center'}
            mt={2} px={15}>
            <Box mt={2} bgcolor="#eaeaea"
                width="100%"
                borderRadius={5}
                paddingY={2}>
                <Grid container spacing={1}>
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