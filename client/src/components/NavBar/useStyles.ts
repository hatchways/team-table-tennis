import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: '100%',
      padding: '0px',
      overflow: 'hidden',
    },
    topnavBar: {
      maxWidth: '100%',
      padding: '10px 0px 10px 0px',
      minHeight: 90,
    },
    kanLogo: {
      padding: '1px 1px 1px 50px',
    },
    dashboardButton: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    calendarButton: {
      padding: '0px 0px 0px 50px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    buttonFonts: {
      fontSize: '1.3em',
    },
    accountButton: {
      padding: '0px 10px 0px 0px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    createboardButton: {
      margin: theme.spacing(1),
      width: '180px',
      height: '45px',
      background: 'rgba(117,156,252,255)',
      boxShadow: 'none',
      fontWeight: 600,
      fontSize: '1.2em',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      padding: '1px 1px 1px 30px',
      flexGrow: 1,
      fontWeight: 600,
    },
    appbarStyle: {
      background: 'rgba(117,156,252,255)',
      boxShadow: 'none',
      margin: '0px',
      padding: '0px',
    },
    hide: {
      display: 'none',
    },
    boardHeader: {
      fontWeight: 600,
      fontSize: '1.4em',
      background: 'rgba(117,156,252,255)',
      color: '#FFF',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 2),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    mainhamburgerMenu: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
        margin: '0px  0px 0px 50px',
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    createboardButtonHamburger: {
      margin: theme.spacing(1),
      width: '180px',
      height: '45px',
      background: 'rgba(117,156,252,255)',
      boxShadow: 'none',
      fontWeight: 600,
      fontSize: '1.2em',
    },
    calendarButtonHamburger: {
      margin: theme.spacing(1),
      width: '180px',
      height: '45px',
      boxShadow: 'none',
      fontWeight: 600,
      fontSize: '1.2em',
    },
    iconspaceHamburger: {
      padding: '0px 10px 0px 0px',
      fontSize: '1.8em',
    },
  }),
);

export default useStyles;
