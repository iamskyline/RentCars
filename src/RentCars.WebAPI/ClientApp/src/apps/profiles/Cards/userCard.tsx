import { Avatar, Box, Grid, Typography } from "@mui/material";
import { User } from "../../../domain/users/user";

interface IProps {
    user: User
}

export function UserCard(props: IProps) {
    return (
        <Box maxWidth="220px" maxHeight="285px"
            bgcolor="#d2d2d2"
            borderRadius={2}
            padding={2}>
            <Grid container spacing={3}>
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
                        Зарегистрирован с:
                    </Typography>
                    <Typography variant="h6" align="center">
                        {props.user.registrationDate.toLocaleDateString()}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}