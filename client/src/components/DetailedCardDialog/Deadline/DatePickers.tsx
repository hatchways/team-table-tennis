import { useState } from 'react';
import { TextField, Grid, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ClearIcon from '@material-ui/icons/Clear';

export default function DatePickers() {
  const classes = useStyles();
  const [deadline, setDeadline] = useState('');
  const saveDeadline = () => {
    console.log(deadline);
  };

  return (
    <Grid id="deadline">
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
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <Grid className={classes.savebuttonPosition}>
        <Button
          className={classes.buttonStyle}
          color="primary"
          variant="contained"
          size="large"
          onClick={() => saveDeadline()}
        >
          Save
        </Button>
        <IconButton onClick={() => setDeadline('')}>
          <ClearIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
