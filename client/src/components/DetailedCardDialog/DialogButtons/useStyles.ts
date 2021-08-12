import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  buttonstyle: {
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
