import { Avatar, Box, Button, ButtonBase, Dialog, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { UserBlank } from "../../../domain/users/userBlank";
import { UserProvider } from "../../../domain/users/userProvider";
import VisuallyHiddenInput from "../../../components/visuallyHiddenInput";

interface IProps {
    isOpen: boolean
    userId: string | null
    onClose: () => void
    onSave: (blank: UserBlank, photo: File | null) => void
}

export function ProfileFormModal(props: IProps) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null)
    const [photo, setPhoto] = useState<File | null>(null)
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

    async function handleSaveUser() {
        props.onSave(userBlank, photo)
    }

    function handleChangePhoto(files: FileList | null) {
        if (files == null) return

        const reader = new FileReader()
        const file = files[0]
        setPhoto(file)

        reader.onloadend = () => {
            setPhotoUrl(reader.result as string)
        }
        reader.readAsDataURL(file);
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
                        {
                            <Button component="label" role="undefined" sx={{ borderRadius: "50%" }}>
                                <VisuallyHiddenInput onSelectPhoto={handleChangePhoto} />
                                {photoUrl != null || userBlank.avatarPath != null
                                    ? <Box sx={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: '50%',
                                        backgroundImage: `url(${photoUrl ?? `https://localhost:7220/avatars/${userBlank.avatarPath}`})`,
                                        cursor: 'pointer',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }} />
                                    : <Avatar sx={{ width: 200, height: 200 }} />
                                }
                            </Button>
                        }
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
                            onClick={handleSaveUser}
                        >
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog >
    );
}