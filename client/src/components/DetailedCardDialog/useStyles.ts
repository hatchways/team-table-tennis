import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  dialogBox: {
    minWidth: '55%',
    height: '760px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    display: 'flex',
  },
  dialogBorder: {
    padding: '0 3%',
  },
  titleContainer: {
    marginTop: '2%',
    alignItems: 'center',
    padding: '0px 0px 0px 25px',
  },
  divider: {
    width: '100%',
  },
  buttonItem: {
    display: 'flex',
    justify: 'flex-start',
    padding: '0px 0px 0 25px',
    alignItems: 'center',
  },
  allButtons: {
    paddingTop: '20px',
    flexDirection: 'column',
    alignItems: 'left',
    display: 'flex',
  },
  buttonTitles: {
    color: '#9fa8da',
    fontSize: '0.9em',
    fontWeight: 600,
    padding: '0 5px 5px',
  },
  iconColor: {
    color: 'rgba(117,156,252,255)',
  },
  mainTitle: {
    padding: '10px 0px 10px 10px',
    color: 'black',
    fontWeight: 600,
    fontSize: '2em',
  },
  progressBar: {
    padding: '0px 0px 10px 60px',
    fontSize: '1.2em',
    fontWeight: 400,
    color: '#9fa8da',
  },
  demoButton: {
    backgroundColor: '#e8eaf6',
    color: '#757575',
    padding: '8px 0',
    margin: '5px 5px',
    width: '110px',
    '&:hover': {
      background: 'rgba(117,156,252,255)',
      color: 'white',
    },
  },
  buttonStyle: {
    backgroundColor: '#e8eaf6',
    color: '#757575',
    padding: '8px 0',
    margin: '5px 5px',
    width: '110px',
    '&:hover': {
      background: 'rgba(117,156,252,255)',
      color: 'white',
    },
  },
}));

export default useStyles;
