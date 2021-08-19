import { useState } from 'react';
import { TextField, Grid, DialogTitle, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import { hasData } from '../DetailedCardDialog';

export default function CommentItem() {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const saveComment = () => {
    console.log(comment);
  };

  return (
    <Grid id="comment" style={hasData(comment)}>
      <Grid container className={classes.titleContainer}>
        <MessageOutlinedIcon className={classes.iconColor} />
        <Grid className={classes.titleFont}>Add comment:</Grid>
      </Grid>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder={'Write a comment...'}
        variant="outlined"
        className={classes.textField}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Grid className={classes.savebuttonPosition}>
        <Button
          className={classes.buttonStyle}
          color="primary"
          variant="contained"
          size="large"
          onClick={() => saveComment()}
        >
          Save
        </Button>
        <IconButton onClick={() => setComment('')}>
          <ClearIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
