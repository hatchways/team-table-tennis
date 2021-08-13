import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';

import NavBar from '../../components/NavBar/NavBar';
import Board from '../../components/Board/Board';
import BoardApi, { BoardContext, useBoard } from '../../helpers/APICalls/board';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { board } = useBoard();
  const { loggedInUserBoard: loggedInUser } = useAuth();
  // const { initSocket } = useSocket();

  const history = useHistory();

  //useEffect(() => {
  //  initSocket();
  //}, [initSocket]);

  console.log('board loaded');
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }
  //if (!board) {
  //  return <CircularProgress />;
  //}

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`} direction="row">
      <NavBar boardTitle={loggedInUser.board?.title} />
      <Grid item className={classes.drawerWrapper}></Grid>
      <Grid item xs>
        <Board></Board>
      </Grid>
      <CssBaseline />
    </Grid>
  );
}
