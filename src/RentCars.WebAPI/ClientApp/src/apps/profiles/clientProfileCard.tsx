import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export function ClientProfileCard() {
    return (
        <Box maxWidth="1200px" mx="auto"
            display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box bgcolor="#eaeaea" width="100%"
                borderRadius={5}
                padding={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={2}>
                        <Avatar sx={{ width: 150, height: 150 }} />
                    </Grid>
                    <Grid item xs={11} md={8} lg={9}>
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
                    <Grid item xs={1} md={1} lg={1}
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