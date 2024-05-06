import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export function ClientProfileCard() {
    return (
        <Box maxWidth="1200px" mx="auto"
            display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box bgcolor="#eaeaea"
                borderRadius={5}
                padding={5}>
                <Grid container>
                    <Grid item xs={3}>
                        <Avatar sx={{ width: 150, height: 150 }} />
                    </Grid>
                    <Grid item xs={6} padding={2}>
                        <Typography variant="h5"
                            mb={1}>
                            Имя пользователя
                        </Typography>
                        <Typography variant="body1"
                            mb={1}>
                            На сайте с: xx.xx.20xx
                        </Typography>
                        <Typography variant="body1"
                            mb={1}>
                            Количество арендованных автомобилей: x
                        </Typography>
                    </Grid>
                    <Grid item xs={3}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-start">
                        <IconButton aria-label="logout">
                            <LogoutIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}