import { Button, Box, Grid, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ClearIcon from '@material-ui/icons/Clear';

export default function AttachmentItem() {
  const classes = useStyles();

  return (
    <Grid>
      <Grid container className={classes.titleContainer}>
        <AttachFileOutlinedIcon className={classes.iconColor} />
        <Grid className={classes.titleFont}>Attachment:</Grid>
      </Grid>
      <Box>
        <input multiple type="file" className={classes.inputButton} />
      </Box>
      <Grid className={classes.savebuttonPosition}>
        <Button className={classes.buttonStyle} color="primary" variant="contained" size="large">
          Save
        </Button>
        <IconButton>
          <ClearIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
