import { Avatar, Box, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Link, To } from 'react-router-dom'
import { useAuthContext } from '../apps/contexts/authContext'
import { NavItem } from './navItem'

interface NavItemProps {
    title: string
    route: To,
    private: boolean
}

const tabs: NavItemProps[] = [
    { title: "Автомобили", route: "/vehicles", private: true },
    { title: "Пользователи", route: "/users", private: false },
    { title: "Запросы на аренду", route: "/requests", private: false },
]

export function Layout(props: PropsWithChildren<{}>) {
    const { isAdmin } = useAuthContext();

    return (
        <Box>
            <Box width="100%" bgcolor="#737272"
                padding={2} display="flex"
                minHeight="50px" position="fixed" gap={1}
                justifyContent="space-between">
                <Box display="flex"
                    justifyContent="center" alignItems="center"
                    gap={5}>
                    {
                        tabs.map((tab, index) =>
                            <NavItem key={index}
                                isShow={isAdmin && tab.private}
                                route={tab.route}
                                title={tab.title}
                            />
                        )

                    }
                </Box>
                <Box display="flex" gap={1} bgcolor="#d2d2d2"
                    borderRadius={12} padding={1}
                    justifyContent="center" alignItems="center"
                    sx={{ cursor: "pointer" }}>
                    <Avatar />
                    <Typography>
                        Имя пользователя
                    </Typography>
                </Box>
            </Box>
            {props.children}
        </Box>
    )
}
