import { Grid, Input, Typography, useTheme } from '@material-ui/core';
import useStyles from './useStyles';
import EditIcon from '@material-ui/icons/Edit';
import { ClearOutlined, Delete, Done } from '@material-ui/icons';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { useState } from 'react';
import { editTitle } from '../../helpers/APICalls/board';

export default function BoardTitle() {
  const { loggedInUserBoard: userBoard } = useAuthBoard();
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = useState({ isEditing: false, text: userBoard!.board.title });
  const editOrSubmitClick = () => {
    if (state.isEditing) {
      editTitle(state.text, userBoard!.board._id).then(() => {
        userBoard!.board.title = state.text;
        userBoard!.boardTitles[userBoard!.selectedBoardIndex] = state.text;
      });
    } else {
      console.log('yea');
      setState({ ...state, text: 'test' });
    }
    setState({ ...state, isEditing: !state.isEditing });
  };
  const clearOrDeleteClick = () => {
    if (state.isEditing) {
      setState({ ...state, text: userBoard!.board.title });
    }
    setState({ ...state, isEditing: !state.isEditing });
  };
  const change = (value: string) => {
    setState({ ...state, text: value });
  };
  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
      <Grid item>
        {state.isEditing ? (
          <Input
            defaultValue={userBoard?.board.title}
            onChange={(event) => {
              change(event.target.value);
            }}
          ></Input>
        ) : (
          <Typography variant="h6" className={classes.title}>
            {userBoard?.board.title}
          </Typography>
        )}
      </Grid>
      <Grid item>
        <span onClick={editOrSubmitClick}>{state.isEditing ? <Done /> : <EditIcon />}</span>
      </Grid>
      <Grid item>
        <span onClick={clearOrDeleteClick}>{state.isEditing ? <ClearOutlined /> : <Delete />}</span>
      </Grid>
    </Grid>
  );
}
