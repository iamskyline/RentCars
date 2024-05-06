import { Box, Button, FormControl, Grid, InputLabel, Select, Typography } from "@mui/material";

export function RequestForm() {
    return (
        <Box maxWidth="950px" bgcolor="#eaeaea"
            borderRadius={5} padding={3}>
            <Typography variant="h5" align="center">
                Создание / Редактирование заявки на аренду
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                            Выберите клиента
                        </InputLabel>
                        <Select labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Age">
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                            Выберите автомобиль
                        </InputLabel>
                        <Select labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Age">
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                            Дата начала аренды
                        </InputLabel>
                        <Select labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Age">
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                            Дата окончания аренды
                        </InputLabel>
                        <Select labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Age">
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                            Выберите статус заявки
                        </InputLabel>
                        <Select labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Age">
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Button variant="contained" fullWidth>
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}