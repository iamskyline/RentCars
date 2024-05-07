import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export function VehicleCard() {
    return (
        <Box maxWidth="1200px" mx="auto"
            display="flex" justifyContent="center"
            alignItems="center" height="100vh">
            <Box bgcolor="#eaeaea" width="100%"
                borderRadius={5}
                padding={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={8} container>
                        {/* ФОТА */}
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", height: "450px", bgcolor: "#737272" }}></Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h4">
                                BMW
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h5">
                                5 серии 530d
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6">
                                Год выпуска: 2018
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6">
                                Цвет: белоснежный
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6">
                                Топливо: бензин
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6">
                                Объем двигателя: 3.0 л.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6">
                                Мощность двигателя: 249 л.с
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6">
                                Тип кузова: универсал
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6">
                                Привод: полный
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6">
                                Тип КПП: автомат
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8} lg={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>1 сутки</TableCell>
                                        <TableCell align="right">2-4 суток</TableCell>
                                        <TableCell align="right">4-7 суток</TableCell>
                                        <TableCell align="right">7-14 суток</TableCell>
                                        <TableCell align="right">14 и больше суток</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            10.500 руб.
                                        </TableCell>
                                        <TableCell align="right">
                                            9.500 руб.
                                        </TableCell>
                                        <TableCell align="right">
                                            8.500 руб.
                                        </TableCell>
                                        <TableCell align="right">
                                            6.500 руб.
                                        </TableCell>
                                        <TableCell align="right">
                                            По договоренности
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                        <Button variant="contained">
                            Арендовать
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}