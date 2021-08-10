import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  saving_container: {
    position: 'absolute',
    display: 'flex',
    bottom: '0',
    right: '0',
    margin: ' 0 5vh 2vh 0',
  },
  saving_indicator: {},
  saving_text: {
    fontSize: '1.5vh',
    height: '100%',
    margin: 'auto 5px',
  },
  saved_indicator: {
    animation: `$myEffect 2000ms`,
    fontSize: '1.5vh',
    opacity: '0',
  },
  '@keyframes myEffect': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}));

export default useStyles;
