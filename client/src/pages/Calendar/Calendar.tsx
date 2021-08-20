import React from 'react';
import useStyles from './useStyle';
import DnDCalendar from '../../components/Calendar/DnDCaldendar';
import { CircularProgress, CssBaseline, Grid } from '@material-ui/core';
import NavBar from '../../components/NavBar/NavBar';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { useHistory } from 'react-router-dom';

const Calendar = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUserBoard: loggedInUser } = useAuthBoard();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`} direction="row">
      <NavBar boardTitle={loggedInUser.board?.title} />
      <Grid item className={classes.drawerWrapper}></Grid>
      <Grid item xs>
        <DnDCalendar />;
      </Grid>
      <CssBaseline />
    </Grid>
  );
};

export default Calendar;
