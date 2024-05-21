import { Box, Button, FormControl, Grid, InputLabel, Select, Typography } from "@mui/material";
import { DatePicker } from "react-widgets/cjs";

export function RequestForm() {
    return (
        <Box maxWidth="950px" bgcolor="#eaeaea"
            borderRadius={5} padding={3}>
            <Typography variant="h5" align="center">
                Создание / Редактирование заявки на аренду
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}
                    display="flex" alignItems="center"
                    justifyContent="center">
                    <DatePicker placeholder="Дата начала аренды" />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>
                            Выберите клиента
                        </InputLabel>
                        <Select>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>
                            Выберите автомобиль
                        </InputLabel>
                        <Select>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4} display="flex" alignItems="center"
                    justifyContent="center">
                    <DatePicker placeholder="Дата окончания аренды" />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>
                            Выберите статус заявки
                        </InputLabel>
                        <Select>

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