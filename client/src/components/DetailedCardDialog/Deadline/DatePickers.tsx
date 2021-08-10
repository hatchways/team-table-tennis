import { TextField, Grid, DialogTitle, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ClearIcon from '@material-ui/icons/Clear';

export default function DatePickers() {
  const classes = useStyles();

  return (
    <Grid>
      <Grid container className={classes.titleContainer}>
        <ScheduleOutlinedIcon className={classes.iconColor} />
        <Grid className={classes.titleFont}>Deadline:</Grid>
      </Grid>
      <TextField
        id="date"
        type="date"
        defaultValue="Pick a date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
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
