import { Box, Typography } from "@mui/material";
import { Link, To, useNavigate } from "react-router-dom";

interface IProps {
    title: string
    route: To,
    isShow: boolean
}

export function NavItem(props: IProps) {
    const navigate = useNavigate()
    return (
        <Box onClick={() => navigate(props.route)} sx={{cursor: 'pointer'}}>
            {
                props.isShow &&
                <Typography variant="body1" sx={{color: 'white'}}>
                    {props.title}
                </Typography>
            }
        </Box>
    )
}
