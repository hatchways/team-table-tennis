import { Container, Grid, AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core/';
import { CalendarTodayOutlined, Dashboard, DashboardOutlined } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import AccountButton from '../../AccountButton/AccountButton';
import useStyles from './useStyles';
import logo from '../../../Images/logo.png';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container direction="row" alignItems="center" justify="center" className={classes.topnavBar}>
        <Grid item xs={3}>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justify="flex-start"
            className={classes.kanLogo}
          >
            <img src={logo} alt="logo" />
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" justify="flex-end">
            <Grid item>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button size="large" startIcon={<DashboardOutlined />} className={classes.buttonFonts}>
                  Dashboard
                </Button>
              </Link>
            </Grid>
            <Grid item className={classes.calendarButton}>
              {' '}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" justify="flex-end"></Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container alignItems="center" justify="flex-end" className={classes.accountButton}>
            <Grid>
              <AccountButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AppBar position="static" className={classes.appbarStyle}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
