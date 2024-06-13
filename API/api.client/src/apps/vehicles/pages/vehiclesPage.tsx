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
    const {isAdmin} = useAuthContext()

    useEffect(() => {
        async function loadAllVehicles() {
            const allVehicles = await VehicleProvider.getAll();
            setVehicles(allVehicles);
        }
        loadAllVehicles();
    }, [])

    return (
        <Box display="flex" flexDirection={'column'} alignItems={'center'} mt={2} px={2}>
            <Button
                variant="contained"
                onClick={() => navigate(VehicleLinks.toForm())}
                >
                Добавить новый автомобиль
            </Button>
            <Box mt={2} bgcolor="#eaeaea"
                width="100%"
                borderRadius={5}
                paddingY={2}>
                <Grid container spacing={1}>
                    {vehicles.map(vehicle =>
                        <Grid key={vehicle.id} item xs={12} md={4} lg={2}
                            display="flex" justifyContent="center"
                            alignItems="center">
                                <VehicleCard vehicle={vehicle} isAdmin={isAdmin} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}