import { Box, Button, FormControl, Grid, InputLabel, Select, Stack, TextField, Typography } from "@mui/material";

export function VehicleForm() {
    return (
        <Box maxWidth="1200px" bgcolor="#eaeaea"
            borderRadius={5} padding={3}>
            <Typography variant="h5"
                align="center">
                Добавление / Редактирование автомобиля
            </Typography>
            <Stack direction="column" gap={3} mt={2}>
                <Grid container>
                    <Grid item xs={12} container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Название марки автомобиля"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Цвет кузова автомобиля"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость суток аренды"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Название модели автомобиля"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Мощность автомобиля"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 2-4 суток аренды"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Год выпуска автомобиля"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">
                                    Тип мотора автомобиля
                                </InputLabel>
                                <Select labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="engineType">
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 4-7 суток аренды"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Класс автомобиля"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">
                                    Привод автомобиля
                                </InputLabel>
                                <Select labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="driveType">
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 7-14 суток аренды"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">
                                    Тип КПП автомобиля
                                </InputLabel>
                                <Select labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="transmissionType">
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">
                                    Объем мотора автомобиля
                                </InputLabel>
                                <Select labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="volumeEngine">
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 14+ суток аренды"
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Button variant="contained">
                                Выбрать фотографии
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}></Grid>
                        <Grid item xs={12} md={6} lg={4} display="flex"
                            justifyContent="flex-end">
                            <Button variant="contained">
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>

                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2.4}>
                        <Box sx={{ width: "100%", height: "100px", bgcolor: "#737272" }}></Box>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
}