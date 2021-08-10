import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';

interface SIProps {
  bStatus: boolean;
}

const SaveIndicator = ({ bStatus }: SIProps): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      {
        <div className={classes.saving_container}>
          {bStatus ? (
            <>
              <span className={classes.saving_text}>saving</span> <CircularProgress color="secondary" size={20} />
            </>
          ) : (
            <span className={classes.saved_indicator}>saved</span>
          )}
        </div>
      }
    </>
  );
};

export default SaveIndicator;
