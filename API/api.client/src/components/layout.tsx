import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { PropsWithChildren } from 'react'
import { Link, To, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../apps/contexts/authContext'
import { NavItem } from './navItem'
import Logo from "../assets/logos/Logotype.png";
import { UserLinks, VehicleLinks } from '../domain/constants/links'

interface NavItemProps {
    title: string
    route: To
    private: boolean
}

const tabs: NavItemProps[] = [
    { title: "Автомобили", route: "/vehicles", private: false },
    { title: "Пользователи", route: "/users", private: true },
    { title: "Запросы на аренду", route: "/requests", private: true },
]

export function Layout(props: PropsWithChildren<{}>) {
    const { isAdmin, userId, userName, logout } = useAuthContext();
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    return (
        <Box width="100%">
            <Box width="100%" bgcolor="#737272"
                paddingY={2} paddingX={10} display="flex"
                minHeight="40px"
                justifyContent={'space-between'}
                boxSizing={'border-box'}
            >
                <Stack direction={'row'} gap={4}>
                    <Link to={VehicleLinks.all}>
                        <img src={Logo} alt="logo"
                            width="50px" height="50px" />
                    </Link>
                    <Stack gap={4} direction={'row'} alignItems={'center'}>
                        {
                            tabs.map((tab, index) =>
                                <NavItem key={index}
                                    isShow={isAdmin || !tab.private}
                                    route={tab.route}
                                    title={tab.title}
                                />
                            )
                        }
                    </Stack>
                </Stack>
                <Box display="flex" gap={1} bgcolor="#d2d2d2"
                    borderRadius={12} padding={1}
                    justifyContent="center" alignItems="center"
                    onClick={() => {
                        console.log(userId)
                        if (userId == null) return
                        isAdmin
                            ? navigate(UserLinks.toAdminProfile())
                            : navigate(UserLinks.toProfile(userId))

                    }}
                    sx={{ cursor: "pointer" }}>
                    <Avatar />
                    <Typography>
                        {userName}
                    </Typography>
                    <IconButton aria-label="logout" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Box>
            {props.children}
        </Box>
    )
}
