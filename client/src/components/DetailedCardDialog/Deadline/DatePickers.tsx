import { TextField, Grid, DialogTitle, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import { useAuthBoard } from '../../../context/useAuthBoardContext';
import { Card } from '../../../interface/CardApi';
import { useState } from 'react';
import { editDeadLine } from '../../../helpers/APICalls/cards';
import moment from 'moment';

interface properties {
  card: Card;
}
export default function DatePickers(props: properties) {
  const classes = useStyles();
  const { loggedInUserBoard: userBoard } = useAuthBoard();

  const getInitialDate = () => {
    const oldDate = new Date(userBoard!.cards[props.card._id].cardDetails.deadLine);
    //date.setHours(0, 0, 0, 0);
    return moment(oldDate).format('YYYY-MM-DD');
  };

  const [date, setDate] = useState(getInitialDate());

  console.log(date);
  const handleDateChange = (value: string) => {
    //setDate(value);
    console.log('Date: ' + value);
  };
  return (
    <Grid>
      <Grid container className={classes.titleContainer}>
        <ScheduleOutlinedIcon className={classes.iconColor} />
        <Grid className={classes.titleFont}>Deadline:</Grid>
      </Grid>
      <TextField
        id="date"
        type="date"
        defaultValue={date}
        placeholder="Pick a date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => {
          handleDateChange(event.target.value);
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
