import { Box, Button, Grid } from "@mui/material";
import { RentalRequestCard } from "../cards/rentalRequestCard";
import { RentalRequest } from "../../../domain/rentalRequests/rentalRequest";
import { useEffect, useState } from "react";
import { RentalRequestProvider } from "../../../domain/rentalRequests/rentalRequestProvider";
import { NameOfUser } from "../../../domain/users/nameOfUser";
import { NameOfVehicle } from "../../../domain/vehicles/nameOfVehicle";
import { RentalRequestFormModal } from "../cards/rentalRequestFormModal";
import { RentalRequestBlank } from "../../../domain/rentalRequests/rentalRequestBlank";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";

export function RentalRequestsPage() {
    const [rentalRequests, setRenalRequests] = useState<RentalRequest[]>([]);
    const [selectedRentalRequest, setSelectedRentalRequest] = useState<string | null>(null)
    const [users, setUsers] = useState<NameOfUser[]>([]);
    const [vehicles, setVehicles] = useState<NameOfVehicle[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        loadAllRentalRequests();
    }, [])

    async function loadAllRentalRequests() {
        const allRentalRequests = await RentalRequestProvider.getAll();
        setRenalRequests(allRentalRequests.rents);
        setUsers(allRentalRequests.users);
        setVehicles(allRentalRequests.vehicles);
    }

    async function saveRentalRequest(blank: RentalRequestBlank) {
        const saveResponse = await RentalRequestProvider.save(blank)
        if (!saveResponse.isSuccess) return addErrorNotification(saveResponse.errorsString)
        addSuccessNotification("Запрос на аренду успешно сохранён")
        loadAllRentalRequests()
        handleCloseModal()
    }

    function handleEdit(rentalRequestId: string) {
        setSelectedRentalRequest(rentalRequestId)
        handleOpenModal()
    }

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false)
        setSelectedRentalRequest(null)
    }

    function handleDeleteRentalRequest(rentalRequestId: string) {
        setRenalRequests(rentalRequests.filter(r => r.id != rentalRequestId))
    }

    return (
        <Box mt={2}>
            {isOpen &&
                <RentalRequestFormModal
                    rentalRequestId={selectedRentalRequest}
                    isOpen={isOpen}
                    onSave={(blank) => saveRentalRequest(blank)}
                    onClose={handleCloseModal}
                />
            }
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <Button variant="contained" onClick={handleOpenModal}>
                    Добавить запрос на аренду
                </Button>
            </Box>
            <Box sx={{
                bgcolor: "#eaeaea",
                margin: 2,
                borderRadius: 5,
                paddingX: 2,
                paddingY: 2,
            }}>
                <Grid container spacing={1}>
                    {
                        rentalRequests.map(rentalRequest => {
                            const user = users.find(u => u.id == rentalRequest.userId)!;
                            const vehicle = vehicles.find(u => u.id == rentalRequest.vehicleId)!;

                            return (
                                <Grid key={rentalRequest.id} item xs={12} md={5} lg={3}
                                    sx={{ zIndex: 10 }}
                                    display="flex" justifyContent="center"
                                    alignItems="center">
                                    <RentalRequestCard
                                        rentalRequest={rentalRequest}
                                        user={user}
                                        vehicle={vehicle}
                                        onEdit={() => handleEdit(rentalRequest.id)}
                                        onDelete={handleDeleteRentalRequest}
                                    />
                                </Grid>
                            )
                        }
                        )}
                </Grid>
            </Box>
        </Box >
    );
}