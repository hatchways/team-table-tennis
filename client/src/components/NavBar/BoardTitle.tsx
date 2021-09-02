import { Grid, Input, Typography, useTheme } from '@material-ui/core';
import useStyles from './useStyles';
import EditIcon from '@material-ui/icons/Edit';
import { ClearOutlined, Delete, Done } from '@material-ui/icons';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { useState } from 'react';
import { deleteBoard, editTitle } from '../../helpers/APICalls/board';

interface properties {
  selectedIndex: number;
  title: string;
  changeBoardTitles: (titles: string[]) => void;
}
export default function BoardTitle(props: properties) {
  // props are needed so the board title will switch when the selected board is changed

  const { loggedInUserBoard: userBoard, changeBoard } = useAuthBoard();
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = useState({
    isEditing: false,
    text: props.title,
    selectedIndex: props.selectedIndex,
  });
  const editOrSubmitClick = () => {
    //const isEditing = newState.isEditing;
    if (state.isEditing) {
      editTitle(state.text, userBoard!.board._id).then(() => {
        userBoard!.board.title = state.text;
        userBoard!.boardTitles[userBoard!.selectedBoardIndex] = state.text;
        // selectedIndex now matches the state, allowing the title to update
        setState({ ...state, selectedIndex: props.selectedIndex, isEditing: !state.isEditing });
        props.changeBoardTitles(userBoard!.boardTitles);
      });
    } else {
      setState({ ...state, isEditing: !state.isEditing });
    }
  };
  const clearOrDeleteClick = () => {
    if (state.isEditing) {
      setState({ ...state, text: userBoard!.board.title, isEditing: !state.isEditing });
    } else {
      deleteBoard(userBoard!.user!._id, userBoard!.board._id).then(() => {
        userBoard!.boardTitles.splice(userBoard!.selectedBoardIndex, 1);
        userBoard!.selectedBoardIndex = 0;
        changeBoard(0);
        props.changeBoardTitles(userBoard!.boardTitles);
      });
    }
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
            {state.selectedIndex === props.selectedIndex ? state.text : props.title}
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
