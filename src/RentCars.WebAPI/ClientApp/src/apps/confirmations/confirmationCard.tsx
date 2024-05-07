import { Box, Button, Grid, Typography } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';

export function ConfirmationCard() {
    return (
        <Box maxWidth="650px" bgcolor="#eaeaea"
            borderRadius={5} padding={3}>
            <Grid container>
                <Grid item xs={3} md={2} lg={2}>
                    <HelpIcon color="disabled" sx={{ fontSize: 100 }} />
                </Grid>
                <Grid item xs={9} md={10} lg={10}
                    container paddingLeft={1}
                    display="flex" alignItems="center"
                    justifyContent="center">
                    <Typography variant="h6"
                        align="center">
                        Вы уверенны что хотите
                        удалить данный элемент?
                    </Typography>
                </Grid>
                <Grid item container spacing={3}>
                    <Grid item xs={6} md={6} lg={6}>
                        <Button variant="outlined" fullWidth>
                            Отменить
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Button variant="contained" fullWidth>
                            Подтвердить
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}