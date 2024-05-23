import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { VehicleBlank } from "../../../domain/vehicles/vehicleBlank";
import { enumToArrayNumber } from "../../../tools/utils/enumUtils";
import { FuelType } from "../../../domain/vehicles/enums/fuelType";
import { BodyType } from "../../../domain/vehicles/enums/bodyType";
import { TransmissionType } from "../../../domain/vehicles/enums/transmissionType";
import { VehicleClass } from "../../../domain/vehicles/enums/vehicleClass";
import { WheelDrive } from "../../../domain/vehicles/enums/wheelDrive";

export function VehicleFormCard() {
    const [vehicleBlank, setVehicleBlank] = useState<VehicleBlank>(VehicleBlank.empty());
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
    console.log(engineCapacityValues);

    function handleChangeBrandName(brandName: string) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, brand: brandName }))
    }

    function handleChangeModelName(modelName: string) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, model: modelName }))
    }

    function handleChangeYearOfManufacture(year: number) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, yearOfManufacture: year }))
    }

    function handleChangeBodyColor(color: string) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, bodyColor: color }))
    }

    function handleChangeEnginePower(power: number) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, enginePower: power }))
    }

    function handleChangeDayCostAmount(dayCostAmount: number) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, dayCost: dayCostAmount }))
    }

    function handleChangeTwoFourDaysCostAmount(twoFourDaysCostAmount: number) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, twoFourDaysCost: twoFourDaysCostAmount }))
    }

    function handleChangeFourSevenDaysCostAmount(fourSevenDaysCostAmount: number) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, fourSevenDaysCost: fourSevenDaysCostAmount }))
    }

    function handleChangeSevenFourteenDaysCostAmount(sevenFourteenDaysCostAmount: number) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, sevenFourteenDaysCost: sevenFourteenDaysCostAmount }))
    }

    function handleChangeFourteenAndMoreDaysCostAmount(fourteenAndMoreDaysCostAmount: number) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, fourteenAndMoreDaysCost: fourteenAndMoreDaysCostAmount }))
    }

    function handleChangeFuelType(fuelTypeValue: FuelType) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, fuelType: fuelTypeValue }))
    }

    function handleChangeBodyType(bodyTypeValue: BodyType) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, bodyType: bodyTypeValue }))
    }

    function handleChangeTransmissionType(transmissionTypeValue: TransmissionType) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, transmissionType: transmissionTypeValue }))
    }

    function handleChangeVehicleClass(vehicleClassValue: VehicleClass) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, vehicleClass: vehicleClassValue }))
    }

    function handleChangeWheelDriveType(wheelDriveValue: WheelDrive) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, wheelDrive: wheelDriveValue }))
    }

    function handleChangeEngineCapacityValue(engineCapacityValue: number) {
        setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, engineCapacity: engineCapacityValue }))
    }

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
                                value={vehicleBlank.brand}
                                onChange={(event) => handleChangeBrandName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Цвет кузова автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.bodyColor}
                                onChange={(event) => handleChangeBodyColor(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость суток аренды"
                                variant="standard"
                                type="number"
                                fullWidth
                                value={vehicleBlank.dayCost}
                                onChange={(event) => handleChangeDayCostAmount(+(event.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Название модели автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.model}
                                onChange={(event) => handleChangeModelName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Мощность автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.enginePower}
                                onChange={(event) => handleChangeEnginePower(+(event.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Стоимость 2-4 суток аренды"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.twoFourDaysCost}
                                onChange={(event) => handleChangeTwoFourDaysCostAmount(+(event.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField label="Год выпуска автомобиля"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.yearOfManufacture}
                                onChange={(event) => handleChangeYearOfManufacture(+(event.target.value))}
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
                                    onChange={(event) => handleChangeFuelType(+(event.target.value))}>
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
                            <TextField label="Стоимость 4-7 суток аренды"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.fourSevenDaysCost}
                                onChange={(event) => handleChangeFourSevenDaysCostAmount(+(event.target.value))}
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
                                    onChange={(event) => handleChangeVehicleClass(+(event.target.value))}>
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
                                    onChange={(event) => handleChangeWheelDriveType(+(event.target.value))}>
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
                            <TextField label="Стоимость 7-14 суток аренды"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.sevenFourteenDaysCost}
                                onChange={(event) => handleChangeSevenFourteenDaysCostAmount(+(event.target.value))}
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
                                    onChange={(event) => handleChangeTransmissionType(+(event.target.value))}>
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
                                    onChange={(event) => handleChangeEngineCapacityValue(+(event.target.value))}
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
                            <TextField label="Стоимость 14+ суток аренды"
                                variant="standard"
                                fullWidth
                                value={vehicleBlank.fourteenAndMoreDaysCost}
                                onChange={(event) => handleChangeFourteenAndMoreDaysCostAmount(+(event.target.value))}
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
                                    onChange={(event) => handleChangeBodyType(+(event.target.value))}>
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
                        <Button variant="contained">
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
}