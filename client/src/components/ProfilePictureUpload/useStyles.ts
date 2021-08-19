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
    padding: '10% 0px 0% 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '10% 0px 0% 0px',
    },
  },
  chooseimageButton: {
    width: '12vw',
    height: '7vh',
    display: 'flex',
    flexWrap: 'nowrap',
    padding: '0px 0px 0px 0px',
    border: '2px dashed #000',
    background: 'linear-gradient(45deg, rgba(117,156,252,255) 30%, #64b5f6 90%)',
    borderRadius: 6,
    boxShadow: 'hidden',
    color: 'black',
    '&:hover': {
      background: '#2962ff',
      color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      width: '15vw',
      height: '7vh',
      display: 'flex',
      flexWrap: 'nowrap',
      padding: '0px 0px 0px 0px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5vh',
      width: '19vw',
      padding: '0% 0px 0% 0%',
    },
  },
  submitButton: {
    height: '4vh',
    width: '10vw',
    padding: '20% 0px 30% 30%',
    [theme.breakpoints.down('sm')]: {
      height: '5%',
      width: '10%',
      padding: '5% 0px 5% 8%',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5%',
      width: '10%',
      padding: '5% 0px 5% 0%',
    },
  },
  profileImage: {
    width: '100%',
    height: 'undefined',
    aspectRatio: '1',
    borderRadius: '50%',
  },
  imageBox: {
    height: '50%',
    width: '10vw',
    padding: '10% 0px 0px 10%',
    [theme.breakpoints.down('sm')]: {
      width: '40%',
      height: 'undefined',
      padding: '10% 5% 0px 0px',
      aspectRatio: '1',
      borderRadius: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '60%',
      height: 'undefined',
      padding: '10% 5% 0px 0px',
      aspectRatio: '1',
      borderRadius: '50%',
    },
  },
}));

export default useStyles;
