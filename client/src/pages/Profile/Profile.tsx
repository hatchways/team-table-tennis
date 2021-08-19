import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Upload from '../../components/ProfilePictureUpload/Upload';
import { Container, Divider } from '@material-ui/core';
import NavBar from '../../components/NavBar/NavBar';

export default function Profile(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid>
      <Container className={classes.root} disableGutters maxWidth={false}>
        <NavBar />
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
    </Grid>
  );
}
