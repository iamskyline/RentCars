import { Box, Button, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { DatePicker } from "react-widgets/cjs";
import { RentalStatus } from "../../../domain/rentalRequests/enums/rentalStatus";
import { enumToArrayNumber } from "../../../tools/utils/enumUtils";
import { useState } from "react";
import { RentalRequestBlank } from "../../../domain/rentalRequests/rentalRequestBlank";
import { useNotifications } from "../../../hooks/useNotifications";

interface IProps {
    isOpen: boolean,
    onClose: () => void
}

export function RentalRequestFormModal(props: IProps) {
    const { addErrorNotification, addSuccessNotification } = useNotifications();

    const [rentalRequestBlank, setRentalRequestBlank] = useState<RentalRequestBlank>(RentalRequestBlank.empty());

    const statusTypes = enumToArrayNumber<RentalStatus>(RentalStatus);

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            maxWidth="sm"
            sx={{
                bgcolor: "#eaeaea",
                borderRadius: 5
            }}
        >
            <Box padding={2}>
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
                            <Select
                                value={rentalRequestBlank.status}
                                onChange={(event) => setRentalRequestBlank((rentalRequestBlank) => ({ ...rentalRequestBlank, status: (+(event.target.value)) }))}>
                                {
                                    statusTypes.map(type => (
                                        <MenuItem key={type} value={type}>
                                            {RentalStatus.getDisplayName(type)}
                                        </MenuItem>
                                    ))
                                }
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
        </Dialog>
    );
}