import { Box, IconButton, SxProps, Theme } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

interface VehiclePhotoProps{
    path: string
    sx?: SxProps<Theme>
    onClick?: () => void
    onDelete?: () => void
}

function VehiclePhoto({path, sx, onClick, onDelete}: VehiclePhotoProps) {

    return (
        <Box
            position={'relative'}
            sx={{ 
                width: "100%", 
                height: "140px", 
                cursor: onClick != null 
                    ? 'pointer' 
                    : 'auto',
                backgroundImage: `url(${path})`,
                backgroundColor: 'gray',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
                ...sx
            }}
            onClick={onClick}>
            
            {onDelete != null &&
                <Box position={'absolute'} right={2} top={2}>
                    <IconButton size="small" color="error" onClick={onDelete} sx={{background: 'white'}}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            }
        </Box>
    )
}

export default VehiclePhoto