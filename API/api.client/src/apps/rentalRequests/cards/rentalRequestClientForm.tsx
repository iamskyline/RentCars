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
                        <DatePicker placeholder="Выберите дату начала аренды" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <DatePicker placeholder="Выберите дату окончания аренды" />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Button variant="outlined"
                            onClick={props.onClose}>
                            Закрыть
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} display="flex" justifyContent="flex-end">
                        <Button variant="contained">
                            Отправить заявку
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}
