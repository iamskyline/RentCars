import { Avatar, Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export function AdminProfileCard() {
    return (
        <Box maxWidth="1200px" mx="auto"
            display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box bgcolor="#eaeaea"
                borderRadius={5}
                padding={5}>
                <Stack direction="column" gap={4}>
                    <Stack direction="row">
                        <Avatar sx={{ width: 150, height: 150 }} />
                        <Box ml={4} >
                            <Typography variant="h5">
                                Имя администратора
                            </Typography>
                        </Box>
                        <Box width="100%" display="flex"
                            alignItems="flex-start" justifyContent="flex-end">
                            <IconButton aria-label="logout">
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    </Stack>
                    <Stack direction="row" gap={6}>
                        <Button variant="contained">
                            Добавить новый автомобиль
                        </Button>
                        <Button variant="contained">
                            Список всех автомобилей
                        </Button>
                        <Button variant="contained">
                            Список всех клиентов
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}