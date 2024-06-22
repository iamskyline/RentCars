import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography, styled } from "@mui/material";
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VehiclePhoto from "./vehiclePhoto";

export function VehicleFormCard() {
    const [vehicleBlank, setVehicleBlank] = useState<VehicleBlank>(VehicleBlank.empty());
    const { vehicleId } = useParams()
    const navigate = useNavigate()

    const [photoUrls, setPhotoUrls] = useState<string[]>([])
    const [photos, setPhotos] = useState<File[]>([])

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
        const result = await VehicleProvider.save(vehicleBlank, photos);
        if (!result.isSuccess) return addErrorNotification(result.errorsString);

        addSuccessNotification("Успешно создано")
        return navigate(VehicleLinks.all)
    }

    function handleChangePhoto(files: FileList | null) {
        if (files == null) return

        let fileUrls: string[] = []
        const readers: Promise<void>[] = []

        for (let index = 0; index < files.length; index++) {
            const reader = new FileReader()
            const file = files[index]

            readers.push(new Promise((resolve) => {
                reader.onload = (e) => {
                    const src = e.target?.result
                    fileUrls = [...fileUrls, src?.toString() ?? '']
                    resolve()
                }
                reader.readAsDataURL(file);
            }))
        }

        Promise.all(readers).then(() => {
            setPhotoUrls(fileUrls)
            setPhotos(Array.from(files))
        })
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    function handleDeleteUploadedPhoto(indexToRemove: number) {
        setPhotoUrls(photoUrls.filter((_, index) => index !== indexToRemove))
        setPhotos(photos.filter((_, index) => index !== indexToRemove))
    }

    function handleDeleteExistPhoto(index: number) {
        let photoBlanks = [...vehicleBlank.existPhotos]
        photoBlanks[index].isDeleted = true

        setVehicleBlank((prevState) => ({ ...prevState, existPhotos: photoBlanks }))
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
            <Grid container mt={2}>
                <Grid item xs={12} container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField label="Название марки автомобиля"
                            variant="standard"
                            fullWidth
                            value={vehicleBlank.brand ?? ''}
                            onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, brand: (event.target.value) }))}
                            inputProps={{ tabIndex: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField label="Цвет кузова автомобиля"
                            variant="standard"
                            fullWidth
                            value={vehicleBlank.bodyColor ?? ''}
                            onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, bodyColor: (event.target.value) }))}
                            inputProps={{ tabIndex: 7 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField label="Стоимость суток аренды"
                            variant="standard"
                            type="number"
                            fullWidth
                            value={vehicleBlank.dayCost ?? ''}
                            onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, dayCost: (+(event.target.value)) }))}
                            inputProps={{ tabIndex: 12 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField label="Название модели автомобиля"
                            variant="standard"
                            fullWidth
                            value={vehicleBlank.model ?? ''}
                            onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, model: (event.target.value) }))}
                            inputProps={{ tabIndex: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField label="Мощность автомобиля"
                            variant="standard"
                            fullWidth
                            value={vehicleBlank.enginePower ?? ''}
                            onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, enginePower: (+(event.target.value)) }))}
                            inputProps={{ tabIndex: 8 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField label="Стоимость 2-4 суток аренды (цена за сутки)"
                            variant="standard"
                            fullWidth
                            value={vehicleBlank.twoFourDaysCost ?? ''}
                            onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, twoFourDaysCost: (+(event.target.value)) }))}
                            inputProps={{ tabIndex: 13 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField label="Год выпуска автомобиля"
                            variant="standard"
                            fullWidth
                            value={vehicleBlank.yearOfManufacture ?? ''}
                            onChange={(event) => setVehicleBlank((vehicleBlank) => ({ ...vehicleBlank, yearOfManufacture: (+(event.target.value)) }))}
                            inputProps={{ tabIndex: 3 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl variant="standard"
                            fullWidth>
                            <InputLabel>
                                Тип мотора автомобиля
                            </InputLabel>
                            <Select inputProps={{ tabIndex: 9 }}
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
                            inputProps={{ tabIndex: 14 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl variant="standard"
                            fullWidth>
                            <InputLabel>
                                Класс автомобиля
                            </InputLabel>
                            <Select inputProps={{ tabIndex: 4 }}
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
                            <Select inputProps={{ tabIndex: 10 }}
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
                            inputProps={{ tabIndex: 15 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl variant="standard"
                            fullWidth>
                            <InputLabel>
                                Тип КПП автомобиля
                            </InputLabel>
                            <Select inputProps={{ tabIndex: 5 }}
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
                            <Select inputProps={{ tabIndex: 11 }}
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
                            inputProps={{ tabIndex: 16 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl variant="standard"
                            fullWidth>
                            <InputLabel>
                                Тип кузова автомобиля
                            </InputLabel>
                            <Select inputProps={{ tabIndex: 6 }}
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
                </Grid>
            </Grid>
            <Box mt={2}>
                <Button
                    component="label"
                    variant="outlined"
                    role="undefined"
                    startIcon={<CloudUploadIcon />}
                    tabIndex={-1}
                >
                    Загрузить фото
                    <VisuallyHiddenInput type="file" multiple onChange={(e) => handleChangePhoto(e.target.files)} />
                </Button>
            </Box>
            <Stack direction={'row'} mt={2} spacing={2}>
                {vehicleBlank.existPhotos.length > 0 &&
                    vehicleBlank.existPhotos.map((ph, index) =>
                        !ph.isDeleted
                            ? <VehiclePhoto
                                key={index}
                                path={`https://localhost:7220/uploads/${ph.path}`}
                                sx={{ width: '200px' }}
                                onDelete={() => handleDeleteExistPhoto(index)}
                            />
                            : <></>
                    )}

                {photoUrls.map((ph, index) =>
                    <Grid item key={ph} xs={6} md={4} lg={2.4}>
                        <VehiclePhoto
                            key={index}
                            path={ph}
                            sx={{ width: '200px' }}
                            onDelete={() => handleDeleteUploadedPhoto(index)}
                        />
                    </Grid>
                )}
            </Stack>
            <Box mt={2}>
                <Button
                    variant="contained"
                    onClick={save}
                >
                    Сохранить
                </Button>
            </Box>
        </Box>
    );
}