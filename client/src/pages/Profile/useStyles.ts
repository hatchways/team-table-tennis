import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    Width: '100%',
    Color: '#FFFFFF',
    overflow: 'hidden',
  },
  mainBox: {
    width: '30%',
    height: '60%',
    margin: '5% 0px 20px 35%',
    border: 1,
    borderRadius: 10,
    boxShadow: '0 2px 1px rgba(117,156,252,255), 0 0px 8px rgba(117,156,252,255)',
    color: 'black',
  },
  title: {
    fontSize: '1.8em',
    fontWeight: 600,
    display: 'flex',
    padding: '60px 0px 60px 25%',
  },
  uploadBox: {
    padding: '0px 0px 0px 30%',
  },
  divider: {
    width: '100%',
  },
}));

export default useStyles;
