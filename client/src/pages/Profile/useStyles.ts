import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      padding: '0px',
      overflow: 'hidden',
    },
    profileBoard: {
      backgroundColor: '#FFFFFF',
    },
    mainBox: {
      width: '30%',
      height: '60%',
      margin: '5% 0px 20px 35%',
      border: 1,
      borderRadius: 10,
      boxShadow: '0 2px 1px rgba(117,156,252,255), 0 0px 8px rgba(117,156,252,255)',
      color: 'black',
      [theme.breakpoints.down('sm')]: {
        width: '60%',
        height: '60vh',
        margin: '5% 10% 20px 20%',
      },
    },
    title: {
      fontSize: '1.8em',
      fontWeight: 600,
      display: 'flex',
      padding: '5% 0px 5% 25%',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5em',
        fontWeight: 600,
        height: '10vh',
        padding: '7% 0% 0% 30%',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5em',
        fontWeight: 600,
        height: '10vh',
        padding: '9% 0% 0% 20%',
      },
    },
    uploadBox: {
      padding: '0px 0px 0px 30%',
      [theme.breakpoints.down('sm')]: {
        height: '45vh',
        padding: '0px 0px 0px 35%',
      },
    },
    divider: {
      width: '100%',
    },
  }),
);

export default useStyles;
