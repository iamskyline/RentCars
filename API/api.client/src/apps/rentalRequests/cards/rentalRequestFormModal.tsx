import { Box, Button, Dialog, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { RentalStatus } from "../../../domain/rentalRequests/enums/rentalStatus";
import { enumToArrayNumber } from "../../../tools/utils/enumUtils";
import { useEffect, useState } from "react";
import { RentalRequestBlank } from "../../../domain/rentalRequests/rentalRequestBlank";
import { UserProvider } from "../../../domain/users/userProvider";
import { NameOfUser } from "../../../domain/users/nameOfUser";
import { NameOfVehicle } from "../../../domain/vehicles/nameOfVehicle";
import { VehicleProvider } from "../../../domain/vehicles/vehicleProvider";
import DatePicker from "react-widgets/DatePicker";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import "react-widgets/styles.css";

interface IProps {
    isOpen: boolean
    rentalRequestId: string | null
    onSave: (blank: RentalRequestBlank) => void
    onClose: () => void
}

enum DateVariant{
    begin = 0,
    end = 1
}

export function RentalRequestFormModal(props: IProps) {
    const [clients, setClients] = useState<NameOfUser[]>([]);
    const [vehicles, setVehicles] = useState<NameOfVehicle[]>([]);
    const [rentalRequestBlank, setRentalRequestBlank] = useState<RentalRequestBlank>(RentalRequestBlank.empty());

    const statusTypes = enumToArrayNumber<RentalStatus>(RentalStatus);

    useEffect(() => {
        async function load() {
            if(props.rentalRequestId != null){
                const rentalRequest = await RentalRequestProvider.get(props.rentalRequestId)
                if(rentalRequest != null) {
                    setRentalRequestBlank(RentalRequestBlank.toBlank(rentalRequest))
                }
            }

            const allClients = await UserProvider.getAllClients();
            setClients(allClients);

            const allVehicles = await VehicleProvider.getAllNameOfVehicles();
            setVehicles(allVehicles);
        }
        load();
    }, [])

    function handleChangeRentalDate(date: Date | null | undefined, variant: DateVariant){
        if(date == null) return

        switch (variant) {
            case DateVariant.begin:
                setRentalRequestBlank((blank) => ({...blank, rentalStartDateTimeUtc: date}))
                break;
            case DateVariant.end:
                setRentalRequestBlank((blank) => ({...blank, rentalEndDateTimeUtc: date}))
                break;
            default:
                return
        }
    }

    async function handleSaveRentalRequest(){
        props.onSave(rentalRequestBlank)
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            maxWidth="md"
            sx={{
                borderRadius: 5
            }}
        >
            <Box padding={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    {
                        props.rentalRequestId == null 
                            ? 'Создание заявки на аренду'
                            : 'Редактирование заявки на аренду'
                    }
                </Typography>
                <Divider sx={{mb: 2}}/>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}
                        display="flex" alignItems="center"
                        justifyContent="center">
                        <DatePicker placeholder="Дата начала аренды"
                            value={rentalRequestBlank.rentalStartDateTimeUtc}
                            onChange={(date) => handleChangeRentalDate(date, DateVariant.begin)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink={!!rentalRequestBlank.userId}>
                                Выберите клиента
                            </InputLabel>
                            <Select 
                                value={rentalRequestBlank.userId} 
                                onChange={e => setRentalRequestBlank((prevState) => ({...prevState, userId: e.target.value}))}
                            >
                                {
                                    clients.map((client) => (
                                        <MenuItem key={client.id} value={client.id}>
                                            {client.login}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink={!!rentalRequestBlank.vehicleId}>
                                Выберите автомобиль
                            </InputLabel>
                            <Select 
                                value={rentalRequestBlank.vehicleId}
                                onChange={e => setRentalRequestBlank((prevState) => ({...prevState, vehicleId: e.target.value}))}
                            >
                                {
                                    vehicles.map((vehicle) => (
                                        <MenuItem key={vehicle.id} value={vehicle.id}>
                                            {vehicle.brand}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} display="flex" alignItems="center"
                        justifyContent="center">
                        <DatePicker placeholder="Дата окончания аренды"
                            value={rentalRequestBlank.rentalEndDateTimeUtc}
                            onChange={(date) => handleChangeRentalDate(date, DateVariant.end)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>
                                Выберите статус заявки
                            </InputLabel>
                            <Select
                                value={rentalRequestBlank.status}
                                onChange={(event) =>
                                    setRentalRequestBlank((rentalRequestBlank) =>
                                    ({
                                        ...rentalRequestBlank, status: (+(event.target.value))

                                    }))}
                            >
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
                        <Button 
                            variant="contained" 
                            fullWidth
                            onClick={handleSaveRentalRequest}
                        >
                            Сохранить
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Button variant="outlined" fullWidth
                            onClick={props.onClose}>
                            Закрыть
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
}