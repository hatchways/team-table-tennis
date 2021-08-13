import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import ProfileNavBar from '../../components/NavBar/ProfileNavBar/ProfileNavBar';
import SimpleDialogDemo from '../../components/DetailedCardDialog/DetailedCardDialog';
import Upload from '../../components/ProfilePictureUpload/Upload';
import { Route } from 'react-router-dom';
import { Container, Divider } from '@material-ui/core';

export default function Profile(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  return (
    <Container className={classes.root} disableGutters maxWidth={false}>
      <ProfileNavBar />
      <Grid container className={classes.mainBox}>
        <Grid container className={classes.title}>
          Choose your profile picture
        </Grid>
        <Divider className={classes.divider} />
        <Grid className={classes.uploadBox}>
          <Upload />
        </Grid>
      </Grid>
      <CssBaseline />
    </Container>
  );
}
