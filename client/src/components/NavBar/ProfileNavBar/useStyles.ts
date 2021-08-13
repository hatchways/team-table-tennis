import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: '200px',
      minWidth: '100%',
      padding: '0px',
      margin: '0px',
    },
    topnavBar: {
      Width: '100%',
      padding: '10px 0px 10px 0px',
      maxHeight: 90,
    },
    kanLogo: {
      padding: '1px 1px 1px 50px',
    },
    calendarButton: {
      padding: '0px 0px 0px 50px',
    },
    buttonFonts: {
      fontSize: '1.3em',
    },
    accountButton: {
      padding: '0px 10px 0px 0px',
    },
    createboardButton: {
      margin: theme.spacing(1),
      width: '180px',
      height: '45px',
      background: 'rgba(117,156,252,255)',
      boxShadow: 'none',
      fontWeight: 600,
      fontSize: '1.2em',
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
  }),
);

export default useStyles;
