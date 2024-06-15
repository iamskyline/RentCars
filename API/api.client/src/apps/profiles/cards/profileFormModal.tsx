import { Avatar, Box, Button, Dialog, Grid, TextField } from "@mui/material";
import { User } from "../../../domain/users/user";

interface IProps {
    user: User,
    isOpen: boolean,
    onClose: () => void
}

export function ProfileFormModal(props: IProps) {
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
            <Box padding={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        {/* ФОТА */}
                        <Avatar sx={{ width: 200, height: 200 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Имя пользователя"
                            variant="filled"
                            fullWidth
                            value={props.user.name}
                        />
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="flex-start">
                        <Button variant="outlined"
                            onClick={props.onClose}
                        >
                            Закрыть
                        </Button>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="flex-end">
                        <Button variant="contained">
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
}