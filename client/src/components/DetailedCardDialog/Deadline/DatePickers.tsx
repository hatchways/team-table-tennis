import { useState } from 'react';
import { TextField, Grid, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import { useAuthBoard } from '../../../context/useAuthBoardContext';
import { Card } from '../../../interface/CardApi';
import { editDeadLine } from '../../../helpers/APICalls/cards';
import moment from 'moment';
import { hasData } from '../DetailedCardDialog';

interface properties {
  card: Card;
}
export default function DatePickers(props: properties) {
  const classes = useStyles();
  const { loggedInUserBoard: userBoard } = useAuthBoard();

  const getInitialDate = () => {
    const oldDate = new Date(userBoard!.cards[props.card._id].cardDetails.deadLine);
    return moment(oldDate).format('YYYY-MM-DD');
  };

  const [date, setDate] = useState(getInitialDate());

  const saveDate = () => {
    const newDate = new Date(date);
    editDeadLine(props.card._id, newDate);
    userBoard!.cards[props.card._id].cardDetails.deadLine = newDate;
  };
  const handleDateChange = (value: string) => {
    setDate(value);
  };
  return (
    <Grid id="deadline" style={hasData(date)}>
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
        <Button className={classes.buttonStyle} color="primary" variant="contained" size="large" onClick={saveDate}>
          Save
        </Button>
        <IconButton onClick={() => setDate('')}>
          <ClearIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
