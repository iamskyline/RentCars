import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { VehicleBlank } from "../../../domain/vehicles/vehicleBlank";
import { enumToArrayNumber } from "../../../tools/utils/enumUtils";
import { FuelType } from "../../../domain/vehicles/enums/fuelType";
import { BodyType } from "../../../domain/vehicles/enums/bodyType";
import { TransmissionType } from "../../../domain/vehicles/enums/transmissionType";
import { VehicleClass } from "../../../domain/vehicles/enums/vehicleClass";
import { WheelDrive } from "../../../domain/vehicles/enums/wheelDrive";
import { VehicleProvider } from "../../../domain/vehicles/vehicleProvider";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";
import { useNavigate, useParams } from "react-router-dom";
import { VehicleLinks } from "../../../domain/constants/links";

export function VehicleFormCard() {
    const [vehicleBlank, setVehicleBlank] = useState<VehicleBlank>(VehicleBlank.empty());
    const { vehicleId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (vehicleId == null) return
        loadVehicle(vehicleId)
    }, [])

    async function loadVehicle(vehicleId: string) {
        const vehicle = await VehicleProvider.get(vehicleId)
        if (vehicle == null) return
        setVehicleBlank(VehicleBlank.fromDomain(vehicle))
    }

    const fuelTypes = enumToArrayNumber<FuelType>(FuelType);
    const bodyTypes = enumToArrayNumber<BodyType>(BodyType);
    const transmissionTypes = enumToArrayNumber<TransmissionType>(TransmissionType);
    const vehicleClasses = enumToArrayNumber<VehicleClass>(VehicleClass);
    const wheelDriveTypes = enumToArrayNumber<WheelDrive>(WheelDrive);

    const engineCapacityValues = Array.from(Array(85).keys(), (n) => {
        const value = (n + 1) * 0.1
        if (value % 1 === 0) return Math.round(value)
        return value.toFixed(1)
    });

    async function save() {
        const result = await VehicleProvider.save(vehicleBlank);
        if (!result.isSuccess) return addErrorNotification(result.errorsString);

        addSuccessNotification("Успешно создано")
        return navigate(VehicleLinks.all)
    }

    return (
        <Box maxWidth="1200px" bgcolor="#eaeaea"
            borderRadius={5} padding={3}>
            <Typography variant="h5"
                align="center">
                {vehicleId == null
                    ? 'Добавление автомобиля'
                    : 'Редактирование автомобиля'
                }
            </Typography>
            <Stack direction="column" gap={3} mt={2}>
                <Grid container>
                    <Grid item xs={12} container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Название марки автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.brand ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, brand: (event.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Цвет кузова автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.bodyColor ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, bodyColor: (event.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость суток аренды"
                                variant="standard"
                                type="number"
                                fullWidth
                                value={vehicleBlank.dayCost ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, dayCost: (+(event.target.value)) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Название модели автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.model ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, model: (event.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Мощность автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.enginePower ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, enginePower: (+(event.target.value)) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 2-4 суток аренды (цена за сутки)"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.twoFourDaysCost ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, twoFourDaysCost: (+(event.target.value)) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Год выпуска автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.yearOfManufacture ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, yearOfManufacture: (+(event.target.value)) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel>
                                    Тип мотора автомобиля
                                </InputLabel>
                                <Select
                                    value={vehicleBlank.fuelType}
                                    onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, fuelType: (+(event.target.value)) }))}>
                                    {
                                        fuelTypes.map(type => (
                                            <MenuItem key={type} value={type}>
                                                {FuelType.getDisplayName(type)}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 4-7 суток аренды (цена за сутки)"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.fourSevenDaysCost ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, fourSevenDaysCost: (+(event.target.value)) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel>
                                    Класс автомобиля
                                </InputLabel>
                                <Select
                                    value={vehicleBlank.vehicleClass}
                                    onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, vehicleClass: (+(event.target.value)) }))}>
                                    {
                                        vehicleClasses.map(type => (
                                            <MenuItem key={type} value={type}>
                                                {VehicleClass.getDisplayName(type)}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel>
                                    Привод автомобиля
                                </InputLabel>
                                <Select
                                    value={vehicleBlank.wheelDrive}
                                    onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, wheelDrive: (+(event.target.value)) }))}>
                                    {
                                        wheelDriveTypes.map(type => (
                                            <MenuItem key={type} value={type}>
                                                {WheelDrive.getDisplayName(type)}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 7-14 суток аренды (цена за сутки)"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.sevenFourteenDaysCost ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, sevenFourteenDaysCost: (+(event.target.value)) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel>
                                    Тип КПП автомобиля
                                </InputLabel>
                                <Select
                                    value={vehicleBlank.transmissionType}
                                    onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, transmissionType: (+(event.target.value)) }))}>
                                    {
                                        transmissionTypes.map(type => (
                                            <MenuItem key={type} value={type}>
                                                {TransmissionType.getDisplayName(type)}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel>
                                    Объем мотора автомобиля
                                </InputLabel>
                                <Select
                                    value={vehicleBlank.engineCapacity}
                                    onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, engineCapacity: (+(event.target.value)) }))}
                                >
                                    {
                                        engineCapacityValues.map(capacity => (
                                            <MenuItem key={capacity} value={capacity}>
                                                {capacity} л.
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 14+ суток аренды (цена за сутки)"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.fourteenAndMoreDaysCost ?? ''}
                                onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, fourteenAndMoreDaysCost: (+(event.target.value)) }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl variant="standard"
                                fullWidth>
                                <InputLabel>
                                    Тип кузова автомобиля
                                </InputLabel>
                                <Select
                                    value={vehicleBlank.bodyType}
                                    onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, bodyType: (+(event.target.value)) }))}>
                                    {
                                        bodyTypes.map(type => (
                                            <MenuItem key={type} value={type}>
                                                {BodyType.getDisplayName(type)}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Button variant="contained">
                                Выбрать фотографии
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

                    <Grid item xs={12} md={12} lg={12} display="flex"
                        justifyContent="flex-end">
                        <Button variant="contained" onClick={save}>
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
}