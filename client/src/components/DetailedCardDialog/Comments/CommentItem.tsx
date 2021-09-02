import { useState } from 'react';
import { TextField, Grid, DialogTitle, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import { hasData } from '../DetailedCardDialog';
import { useAuthBoard } from '../../../context/useAuthBoardContext';
import { Card } from '../../../interface/CardApi';
import { editComment } from '../../../helpers/APICalls/cards';
interface properties {
  card: Card;
}
export default function CommentItem(props: properties) {
  const { loggedInUserBoard: userBoard } = useAuthBoard();
  const classes = useStyles();
  const [comment, setComment] = useState(userBoard!.cards[props.card._id].cardDetails.comment);
  const saveComment = () => {
    editComment(props.card._id, comment);
    userBoard!.cards[props.card._id].cardDetails.comment = comment;
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
