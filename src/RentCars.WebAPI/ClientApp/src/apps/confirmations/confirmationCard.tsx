import { Box, Button, Grid, Typography } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';

export function ConfirmationCard() {
    return (
        <Box maxWidth="650px" bgcolor="#eaeaea"
            borderRadius={5} padding={3}>
            <Grid container>
                <Grid item xs={2}>
                    <HelpIcon color="disabled" sx={{ fontSize: 100 }} />
                </Grid>
                <Grid item xs={10} container paddingLeft={1}>
                    <Grid item>
                        <Typography variant="h6"
                            align="center">
                            Вы уверенны что хотите
                            удалить данный элемент?
                        </Typography>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant="outlined">
                                Отменить
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained">
                                Подтвердить
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}