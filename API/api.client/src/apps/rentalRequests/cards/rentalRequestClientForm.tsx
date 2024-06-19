import { Box, Button, Dialog, Grid, Typography } from '@mui/material'
import { useState } from 'react';
import { DatePicker } from 'react-widgets/cjs'
import { RentalRequestBlank } from '../../../domain/rentalRequests/rentalRequestBlank';
import { useAuthContext } from '../../contexts/authContext';
import { RentalStatus } from '../../../domain/rentalRequests/enums/rentalStatus';

interface IProps {
    isOpen: boolean
    onSave: (blank: RentalRequestBlank) => void
    onClose: () => void,
    vehicleId: string
}

enum DateVariant {
    begin = 0,
    end = 1
}

export function RentalRequestClientForm(props: IProps) {
    const { userId } = useAuthContext();
    const emptyBlank = RentalRequestBlank.empty();

    emptyBlank.status = RentalStatus.Processing;
    emptyBlank.userId = userId;
    emptyBlank.vehicleId = props.vehicleId;

    const [rentalRequestBlank, setRentalRequestBlank] = useState<RentalRequestBlank>(emptyBlank);

    function handleChangeRentalDate(date: Date | null | undefined, variant: DateVariant) {
        if (date == null) return

        switch (variant) {
            case DateVariant.begin:
                setRentalRequestBlank((blank) => ({ ...blank, rentalStartDateTimeUtc: date }))
                break;
            case DateVariant.end:
                setRentalRequestBlank((blank) => ({ ...blank, rentalEndDateTimeUtc: date }))
                break;
            default:
                return
        }
    }

    async function handleSaveRentalRequest() {
        props.onSave(rentalRequestBlank)
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            maxWidth="lg"
            sx={{
                borderRadius: 5,
            }}
        >
            <Box padding={2}>
                <Typography variant="h5" align="center" mb={2}>
                    Выберите даты аренды автомобиля
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <DatePicker placeholder="Выберите дату начала аренды"
                            value={rentalRequestBlank.rentalStartDateTimeUtc}
                            onChange={(date) => handleChangeRentalDate(date, DateVariant.begin)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <DatePicker placeholder="Выберите дату окончания аренды"
                            value={rentalRequestBlank.rentalEndDateTimeUtc}
                            onChange={(date) => handleChangeRentalDate(date, DateVariant.end)}
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Button variant="outlined"
                            onClick={props.onClose}>
                            Закрыть
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleSaveRentalRequest}>
                            Отправить заявку
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}
