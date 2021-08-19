import { useState } from 'react';
import { TextField, Grid, DialogTitle, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ClearIcon from '@material-ui/icons/Clear';

export default function CommentItem() {
  const classes = useStyles();
  const [content, setContent] = useState('');

  return (
    <Grid>
      <Grid container className={classes.titleContainer}>
        <MessageOutlinedIcon className={classes.iconColor} />
        <Grid className={classes.titleFont}>Add comment:</Grid>
      </Grid>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder={'Write a comment...'}
        value={content}
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setContent(e.target.value)}
      />
      <Grid className={classes.savebuttonPosition}>
        <Button className={classes.buttonStyle} color="primary" variant="contained" size="large">
          Save
        </Button>
        <IconButton>
          <ClearIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
