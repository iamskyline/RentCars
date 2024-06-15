import { Box, Button, Dialog, Grid, Typography } from '@mui/material'
import { DatePicker } from 'react-widgets/cjs'

interface IProps {
    isOpen: boolean,
    onClose: () => void
}

export function RentalRequestClientForm(props: IProps) {
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            maxWidth="sm"
            sx={{
                borderRadius: 5
            }}
        >
            <Typography variant="h5" align="center">
                Выберите даты аренды автомобиля
            </Typography>
            <Grid item xs={12} md={6} lg={4}>
                <DatePicker placeholder="Выберите дату начала аренды" />

            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <DatePicker placeholder="Выберите дату окончания аренды" />

            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Button variant="outlined"
                    onClick={props.onClose}
                >
                    Закрыть
                </Button>
            </Grid>
        </Dialog>
    )
}
