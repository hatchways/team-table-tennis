import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  titleContainer: {
    marginTop: '1%',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '100px',
    height: '40px',
    padding: '5px 20px',
    background: 'rgba(117,156,252,255)',
    boxShadow: 'none',
  },
  iconColor: {
    color: 'rgba(117,156,252,255)',
  },
  titleFont: {
    fontSize: '1.5em',
    fontWeight: 600,
    padding: '10px 0px 10px 10px',
    color: 'black',
  },
  inputButton: {
    padding: '10px 0px 10px 35px',
  },
  savebuttonPosition: {
    padding: '0px 0px 0px 35px',
  },
}));

export default useStyles;
