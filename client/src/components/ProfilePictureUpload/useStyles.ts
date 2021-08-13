import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  formInput: {
    minWidth: '100px',
    height: '100px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    display: 'flex',
  },
  uploadTitle: {
    fontSize: '1.5em',
    fontWeight: 600,
    padding: '80px 0px 5px 0px',
  },
  chooseimageButton: {
    width: '12vw',
    height: '7vh',
    display: 'flex',
    flexWrap: 'nowrap',
    padding: '0px 0px 0px 0px',
    background: 'linear-gradient(45deg, rgba(117,156,252,255) 30%, #64b5f6 90%)',
    borderRadius: 6,
    boxShadow: 'hidden',
    color: 'white',
    '&:hover': {
      background: '#2962ff',
      color: 'white',
    },
  },
  submitButton: {
    padding: '20% 0px 20% 4vw',
  },
  profileImage: {
    width: '55%',
    height: 'undefined',
    aspectRatio: '1',
    borderRadius: '50%',
  },
  imageBox: {
    height: '200px',
    padding: '20px 0px 0px 0px',
  },
}));

export default useStyles;
