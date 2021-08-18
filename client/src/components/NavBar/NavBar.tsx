import { Container, Grid, AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core/';
import { CalendarTodayOutlined, DashboardOutlined } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import AccountButton from '../AccountButton/AccountButton';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';

export default function NavBar(props: any) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.topnavBar}>
        <Grid item xs={3}>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justify-content="flex-start"
            className={classes.kanLogo}
          >
            <img src={logo} alt="logo" />
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" justify="flex-end">
            <Grid item>
              <Button size="large" startIcon={<DashboardOutlined />} className={classes.buttonFonts}>
                Dashboard
              </Button>
            </Grid>
            <Grid item className={classes.calendarButton}>
              <Button size="large" startIcon={<CalendarTodayOutlined />} className={classes.buttonFonts}>
                Calendar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" justifyContent="flex-end">
            <Grid>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.createboardButton}
                startIcon={<AddIcon />}
              >
                Create board
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container alignItems="center" justifyContent="flex-end" className={classes.accountButton}>
            <Grid>
              <AccountButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AppBar position="static" className={classes.appbarStyle}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.boardTitle}
          </Typography>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
