import { Avatar, Box, Button, Dialog, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { UserBlank } from "../../../domain/users/userBlank";
import { UserProvider } from "../../../domain/users/userProvider";

interface IProps {
    isOpen: boolean
    userId: string | null
    onClose: () => void
    onSave: (blank: UserBlank) => void
}

export function ProfileFormModal(props: IProps) {
    const [userBlank, setUserBlank] = useState<UserBlank>(UserBlank.empty());

    useEffect(() => {
        async function load() {
            if (props.userId != null) {
                const user = await UserProvider.get(props.userId)
                if (user != null) {
                    setUserBlank(UserBlank.toBlank(user))
                }
            }
        }
        load();
    }, [])

    async function handleSaveRentalRequest() {
        props.onSave(userBlank)
    }

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
                        <TextField label="Логин пользователя"
                            variant="filled"
                            fullWidth
                            value={userBlank.login ?? ''}
                            onChange={(event) => setUserBlank((userBlank) => ({ ...userBlank, login: (event.target.value) }))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Имя пользователя"
                            variant="filled"
                            fullWidth
                            value={userBlank.name ?? ''}
                            onChange={(event) => setUserBlank((userBlank) => ({ ...userBlank, name: (event.target.value) }))}
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
                        <Button variant="contained"
                            onClick={handleSaveRentalRequest}
                        >
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
}