import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    accBtn: {
      width: 50,
      height: 50,
      borderRadius: '50%',
      filter: 'drop-shadow(0px 1px 1px rgba(74,106,149,0.2))',
      background: '#FFF',
      boxShadow: 'none',
    },
  }),
);

export default useStyles;
