import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect } from 'react';
import { useHistory, Route, Switch, Link } from 'react-router-dom';
import { useState } from 'react';

import MOCK_BOARDS from '../../mocks/mockBoardData';

import NavBar from '../../components/NavBar/NavBar';
import Board from '../../components/Board/Board';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  const [showBoards, toggleShowBoards] = useState(false);
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  const toggleSidebar = () => {
    toggleShowBoards(!showBoards);
  };

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`} direction="row">
      <NavBar toggleSidebar={toggleSidebar} />
      <Grid item className={classes.drawerWrapper}>
        <ChatSideBanner loggedInUser={loggedInUser} />
      </Grid>
      <Grid item xs>
        <Switch>
          <Route path="/dashboard/:id" component={Board} />
        </Switch>
        <Drawer anchor="right" open={showBoards} onClose={(b: boolean) => toggleShowBoards(!b)}>
          {Object.keys(MOCK_BOARDS).map((key: string) => (
            <ListItem key={key}>
              <Link to={`/dashboard/${key}`}>{MOCK_BOARDS[key].title}</Link>
            </ListItem>
          ))}
        </Drawer>
      </Grid>
      <CssBaseline />
    </Grid>
  );
}
