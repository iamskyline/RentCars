import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Vehicle } from "../../../domain/vehicles/vehicle";
import axios from "axios";
import { FuelType } from "../../../domain/vehicles/enums/fuelType";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";
import { VehicleLinks } from "../../../domain/constants/links";
import { ConfirmationCard } from "../../confirmations/confirmationModal";
import { VehicleProvider } from "../../../domain/vehicles/vehicleProvider";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";

interface IProps {
    vehicle: Vehicle,
    isAdmin: boolean
}

export function VehicleCard(props: IProps) {
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    function handleOpenCard() {
        navigate(VehicleLinks.toCard(props.vehicle.id))
    }

    async function handleDeleteCar() {
        const response = await VehicleProvider.delete(props.vehicle.id)
        if (!response.isSuccess) return addErrorNotification(response.errors[0])
        addSuccessNotification('Автомобиль успешно удалён')
    }

    return (
        <Box maxWidth="220px"
            bgcolor="#d2d2d2"
            borderRadius={2}
            padding={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* ФОТА ТУТ */}
                    <Box
                        sx={{ width: "100%", height: "140px", bgcolor: "#737272", cursor: 'pointer' }}
                        onClick={handleOpenCard}
                    >
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Link to={VehicleLinks.toCard(props.vehicle.id)}>
                        <Typography variant="h4"
                            align="center">
                            {props.vehicle.brand}<br />{props.vehicle.model}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6"
                        align="center">
                        {props.vehicle.engineCapacity} л.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6"
                        align="center">
                        {props.vehicle.enginePower} л.с.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"
                        align="center">
                        {FuelType.getDisplayName(props.vehicle.fuelType)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"
                        align="center">
                        {props.vehicle.yearOfManufacture}
                    </Typography>
                </Grid>
                {
                    props.isAdmin && (
                        <Grid item xs={12} display="flex" justifyContent="space-between">
                            <IconButton color="default" sx={{ zIndex: 100 }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(VehicleLinks.toForm(props.vehicle.id));
                                }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="default" sx={{ zIndex: 100 }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setOpenDeleteModal(true);
                                }}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    )
                }
            </Grid>
            <ConfirmationCard
                isOpen={openDeleteModal}
                onConfirm={handleDeleteCar}
                onClose={handleDeleteModalClose}
            />
        </Box>
    );
}

