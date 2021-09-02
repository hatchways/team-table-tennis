import React from 'react';
import useStyles from './useStyle';
import DnDCalendar from '../../components/Calendar/DnDCaldendar';
import { CssBaseline, Grid } from '@material-ui/core';
import NavBar from '../../components/NavBar/NavBar';
import { useAuthBoard } from '../../context/useAuthBoardContext';

const Calendar = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUserBoard: loggedInUser } = useAuthBoard();

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`} direction="row">
      {loggedInUser ? <NavBar /> : <></>}
      <Grid item xs>
        <DnDCalendar />;
      </Grid>
      <CssBaseline />
    </Grid>
  );
};

export default Calendar;
