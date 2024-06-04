import { Box, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

export function Layout(props: PropsWithChildren<{}>) {
    return (
        <Box>
            <Box width="100%" bgcolor="#737272"
                padding={2} display="flex"
                minHeight="50px" position="fixed">

            </Box>
            {props.children}
        </Box>
    )
}
