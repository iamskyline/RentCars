import { Box, Button, Grid } from "@mui/material";
import { VehicleCard } from "../cards/vehicleCard";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "../../../domain/vehicles/vehicle";
import { useEffect, useState } from "react";
import { VehicleProvider } from "../../../domain/vehicles/vehicleProvider";
import { VehicleLinks } from "../../../domain/constants/links";
import { useAuthContext } from "../../contexts/authContext";

export function VehiclesPage() {
    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const { isAdmin } = useAuthContext()

    useEffect(() => {
        async function loadAllVehicles() {
            const allVehicles = await VehicleProvider.getAll();
            setVehicles(allVehicles);
        }
        loadAllVehicles();
    }, [])

    function handleDeleteCar(vehicleId: string) {
        setVehicles(vehicles.filter(v => v.id != vehicleId))
    }

    return (
        <Box mt={2}>
            {
                isAdmin &&
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <Button variant="contained"
                        onClick={() => navigate(VehicleLinks.toForm())}>
                        Добавить новый автомобиль
                    </Button>
                </Box>
            }
            <Box sx={{
                bgcolor: "#eaeaea",
                margin: 2,
                borderRadius: 5,
                paddingX: 2,
                paddingY: 2
            }}>
                <Grid container spacing={2}>
                    {vehicles.map(vehicle =>
                        <Grid key={vehicle.id} item xs={12} md={4} lg={3}
                            display="flex" justifyContent="center"
                            alignItems="center">
                            <VehicleCard
                                vehicle={vehicle}
                                isAdmin={isAdmin}
                                onDelete={() => handleDeleteCar(vehicle.id)}
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}