import { useState } from 'react';
import { Button, Box, Grid, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import { hasData } from '../DetailedCardDialog';

export default function AttachmentItem() {
  const classes = useStyles();
  const [attachment, setAttachment] = useState('');
  const saveAttachment = () => {
    console.log(attachment);
  };

  return (
    <Grid id="attachment" style={hasData(attachment)}>
      <Grid container className={classes.titleContainer}>
        <AttachFileOutlinedIcon className={classes.iconColor} />
        <Grid className={classes.titleFont}>Attachment:</Grid>
      </Grid>
      <Box>
        <input
          multiple
          type="file"
          className={classes.inputButton}
          value={attachment}
          onChange={(e) => setAttachment(e.target.value)}
        />
      </Box>
      <Grid className={classes.savebuttonPosition}>
        <Button
          className={classes.buttonStyle}
          color="primary"
          variant="contained"
          size="large"
          onClick={() => saveAttachment()}
        >
          Save
        </Button>
        <IconButton onClick={() => setAttachment('')}>
          <ClearIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
