import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export function AdminProfileCard() {
    return (
        <Box maxWidth="1200px" bgcolor="#eaeaea"
            width="100%"
            borderRadius={5}
            padding={5}>
            <Grid container spacing={3}>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12} md={3} lg={2}>
                        <Avatar sx={{ width: 150, height: 150 }} />
                    </Grid>
                    <Grid item xs={10} md={5} lg={6}>
                        <Box>
                            <Typography variant="h5">
                                Имя администратора
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} md={4} lg={4}>
                        <Box width="100%" display="flex"
                            alignItems="flex-start" justifyContent="flex-end">
                            <IconButton aria-label="logout">
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}
                        display="flex" justifyContent="center">
                        <Button variant="contained" fullWidth>
                            Добавить новый автомобиль
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}
                        display="flex" justifyContent="center">
                        <Button variant="contained" fullWidth>
                            Список всех автомобилей
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}
                        display="flex" justifyContent="center">
                        <Button variant="contained" fullWidth>
                            Список всех клиентов
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}