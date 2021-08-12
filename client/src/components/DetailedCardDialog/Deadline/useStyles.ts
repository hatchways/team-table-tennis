import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      display: 'flex',
      padding: '0px 0 15px 35px',
    },
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
    savebuttonPosition: {
      padding: '0px 0px 0px 35px',
    },
  }),
);

export default useStyles;
