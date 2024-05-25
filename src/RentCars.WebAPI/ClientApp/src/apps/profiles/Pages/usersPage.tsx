import { Box, Grid } from "@mui/material";
import { User } from "../../../domain/users/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProvider } from "../../../domain/users/userProvider";
import { UserCard } from "../cards/userCard";
import { UserLinks } from "../../../domain/constants/links";

export function UsersPage() {
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function loadAllUsers() {
            const allUsers = await UserProvider.getAll();
            setUsers(allUsers);
        }
        loadAllUsers();
    }, [])

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
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate(UserLinks.toProfile(user.id))}
                            display="flex" justifyContent="center"
                            alignItems="center">
                            <UserCard user={user} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}