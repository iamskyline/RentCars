import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { UserProvider } from "../../../domain/users/userProvider";
import { useEffect, useState } from "react";
import { User } from "../../../domain/users/user";
import { useAuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import VisuallyHiddenInput from "../../../components/visuallyHiddenInput";
import { UserBlank } from "../../../domain/users/userBlank";
import { addErrorNotification, addSuccessNotification } from "../../../hooks/useNotifications";

export function AdminProfileCard() {
    const { userId, logout } = useAuthContext();

    // const [photoUrl, setPhotoUrl] = useState<string>('')
    // const [photo, setPhoto] = useState<File | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    useEffect(() => {
        async function loadUser() {
            if (userId == null) return;

            const user = await UserProvider.get(userId);
            setUser(user);
        }
        loadUser();
    }, [userId])

    // function handleChangePhoto(files: FileList | null) {
    //     if (files == null) return

    //     let fileUrl: string
    //     const reader = new FileReader()
    //     const file = files[0]

    //     reader.onload = (e) => {
    //         const src = e.target?.result
    //         fileUrl = src?.toString() ?? ''
    //     }

    //     reader.readAsDataURL(file);

    //     Promise.resolve(reader).then(() => {
    //         setPhotoUrl(fileUrl)
    //         setPhoto(files[0])
    //     })
    // }

    return (
        <Box display="flex"
            justifyContent="center">
            <Box maxWidth="1200px" bgcolor="#eaeaea"
                width="100%"
                borderRadius={5}
                padding={5}
                mt={4}>
                {
                    user != null &&
                    <Grid container spacing={3}>
                        <Grid item xs={12} container spacing={1}>
                            <Grid item xs={12} md={3} lg={2}>
                                {
                                    user.avatarPath == null
                                        ?
                                        <Avatar sx={{ width: 150, height: 150 }} />
                                        :
                                        <Box sx={{
                                            width: 150,
                                            height: 150,
                                            backgroundImage: `url(https://localhost:7220/avatars/${user.avatarPath})`,
                                            cursor: 'pointer',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                        />
                                }
                                {/* <Avatar sx={{ width: 150, height: 150 }} /> */}
                            </Grid>
                            <Grid item xs={10} md={5} lg={6}>
                                <Box>
                                    <Typography variant="h5">
                                        {user.name}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={2} md={4} lg={4}>
                                <Box width="100%" display="flex"
                                    alignItems="flex-start" justifyContent="flex-end">
                                    <IconButton aria-label="logout" onClick={handleLogout}>
                                        <LogoutIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Box>
        </Box>
    );
}