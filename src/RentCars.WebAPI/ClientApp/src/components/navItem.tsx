import { Box } from "@mui/material";
import { Link, To } from "react-router-dom";

interface IProps {
    title: string
    route: To,
    isShow: boolean
}

export function NavItem(props: IProps) {
    return (
        <Box>
            {
                props.isShow &&
                <Link to={props.route}>
                    {props.title}
                </Link>
            }
        </Box>
    )
}
