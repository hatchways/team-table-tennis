import { useState } from 'react';
import { TextField, Grid, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import { Card } from '../../../interface/CardApi';
import { useAuthBoard } from '../../../context/useAuthBoardContext';
import { editDescription } from '../../../helpers/APICalls/cards';
interface properties {
  card: Card;
}
export default function DescriptionItem(props: properties) {
  const { loggedInUserBoard: userBoard } = useAuthBoard();
  const classes = useStyles();
  const [content, setContent] = useState(userBoard!.cards[props.card._id].description);

  const clickHandler = () => {
    editDescription(props.card._id, content);
    userBoard!.cards[props.card._id].description = content;
  };
  return (
    <Grid id="description">
      <Grid container className={classes.titleContainer}>
        <ImportContactsOutlinedIcon className={classes.iconColor} />
        <Grid className={classes.titleFont}>Description:</Grid>
      </Grid>
      <TextField
        variant="outlined"
        placeholder={'Add a description...'}
        className={classes.textField}
        rows={6}
        fullWidth
        multiline
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <Grid className={classes.savebuttonPosition}>
        <Button className={classes.buttonStyle} color="primary" variant="contained" size="large" onClick={clickHandler}>
          Save
        </Button>
        <IconButton onClick={() => setContent('')}>
          <ClearIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
