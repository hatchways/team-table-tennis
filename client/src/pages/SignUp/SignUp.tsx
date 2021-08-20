import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { registerBoard } from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import BgImg from '../../components/BgImg/BgImg';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuthBoard();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
<<<<<<< HEAD
    registerBoard(email, password).then((data) => {
=======
<<<<<<< HEAD
    register(email, password).then((data) => {
=======
    registerBoard(email, password).then((data) => {
>>>>>>> f5c906a7649220bdf1223819fc054322f20224a8
>>>>>>> alex/BE_team
      console.log(data);
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <BgImg />
      <Grid item xs={12} sm={8} md={6} elevation={0} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box className={classes.SignUpFormContainer} maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Create an account
                </Typography>
              </Grid>
            </Grid>
            <SignUpForm handleSubmit={handleSubmit} />
          </Box>
          <Box className={classes.authHeader}>
            <AuthHeader linkTo="/login" asideText="Already have an account?" btnText="Login" />
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
