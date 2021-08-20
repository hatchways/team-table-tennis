import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import Board from '../../components/Board/Board';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUserBoard: loggedInUser } = useAuthBoard();
  // const { initSocket } = useSocket();

  const history = useHistory();
  console.log('Is Demo ' + loggedInUser!.user!.isDemo);

  console.log('board loaded');
  if (loggedInUser === undefined || loggedInUser?.columns === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`} direction="row">
      <NavBar />
      <Grid item xs>
        <Board></Board>
      </Grid>
      <CssBaseline />
    </Grid>
  );
}
