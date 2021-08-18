import React, { useState } from 'react';
import Column from './Column';
import { Column as ColumnInterface } from '../../interface/ColumnApi';
import { TaskPlaceHolder } from '../../interface/Task';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { DragDropContext, DropResult, Droppable, DragUpdate } from 'react-beautiful-dnd';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import useStyles from './useStyles';
import { Card as CardInterface, Cards } from '../../interface/CardApi';
import { moveCardToAnotherColumn, moveColumn } from '../../helpers/APICalls/board';
import { createCard } from '../../helpers/APICalls/cards';
import { createColumn, deleteColumnApi } from '../../helpers/APICalls/columns';
import { DetailedCardDialog } from '../DetailedCardDialog/DetailedCardDialog';
const Board: React.FunctionComponent = () => {
  const { loggedInUserBoard: userBoard } = useAuthBoard();

  //const { board, updateBoardContext } = useContext(BoardContext);
  const taskPlaceHolder: TaskPlaceHolder = { clientHeight: 0, clientWidth: 0, clientX: 0, clientY: 0 };
  const classes = useStyles();
  const [state, setState] = useState({
    mockData: userBoard,
    taskPlaceHolder: taskPlaceHolder,
    modalOpen: false,
    newColumnTitle: '',
    isDetailedCardOpen: false,
    openedCard: '',
  });

  const onDragUpdate = (result: DragUpdate) => {
    const { draggableId } = result;

    const dom = document.getElementsByClassName('taskClass-' + draggableId)[0];

    if (!dom) {
      return;
    }
    const parentElement = dom.parentElement;
    if (!parentElement) {
      return;
    }

    const children = dom.parentNode?.children;
    if (!children) {
      return;
    }

    // setup the placeholder task

    const clientY = dom.getBoundingClientRect().y;

    const { clientHeight, clientWidth } = dom;
    const taskPlaceHolder: TaskPlaceHolder = {
      clientWidth: clientWidth,
      clientHeight: clientHeight,
      clientY: clientY,
      clientX: dom.getBoundingClientRect().x,
    };
    const newState = { ...state, taskPlaceHolder };
    setState(newState);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = state.mockData?.board.columns;
      if (newColumnOrder) {
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);
        const mockData = state.mockData;
        if (mockData?.board.columns && mockData.board) {
          mockData.board.columns = newColumnOrder;
          moveColumn(mockData.board._id, source.index, destination.index, draggableId);
        }
      }
      return;
    } else {
      if (state.mockData && state.mockData.cards) {
        const start = state.mockData.columns[source.droppableId];

        const finish = state.mockData.columns[destination.droppableId];
        const startTasks = state.mockData.columns[start._id].cards;
        if (startTasks) {
          startTasks.splice(source.index, 1);
          if (start === finish) {
            startTasks.splice(destination.index, 0, draggableId);
            const newColumn: ColumnInterface = {
              ...start,
              cards: startTasks,
            };

            const newColumns = state.mockData.columns;
            newColumns[source.droppableId] = newColumn;

            const newState = {
              ...state,
              columns: newColumns,
            };
            moveCardToAnotherColumn(start._id, start._id, start.cards, start.cards);
            setState(newState);
          } else {
            // Move to another column
            const finishTasks = state.mockData.columns[finish._id].cards;
            finishTasks.splice(destination.index, 0, draggableId);
            const destinationColumn: ColumnInterface = {
              ...finish,
              cards: finishTasks,
            };
            const sourceColumn: ColumnInterface = {
              ...start,
              cards: startTasks,
            };

            const newColumns = state.mockData.columns;
            newColumns[destination.droppableId] = destinationColumn;
            newColumns[source.droppableId] = sourceColumn;

            const newState = {
              ...state,
              columns: newColumns,
            };
            setState(newState);

            moveCardToAnotherColumn(
              sourceColumn._id,
              destinationColumn._id,
              sourceColumn.cards,
              destinationColumn.cards,
            );
          }
        }
      }
    }
  };

  const addTask = (columnId: string) => {
    createCard('Add title...', '', columnId).then((cardData) => {
      const card: CardInterface = {
        _id: cardData.card._id,
        title: cardData.card.title,
        description: 'test',
        cardDetails: cardData.card.cardDetails,
      };
      const mockData = state.mockData;
      if (mockData) {
        mockData.cards = { ...mockData.cards, [card._id]: card };
        mockData.columns[columnId].cards.push(card._id);
        setState({ ...state, mockData: mockData });
      }
      //console.log('Id: ' + id);
    });
  };

  const newColumn = () => {
    setState({ ...state, modalOpen: true });
  };

  const modalClose = () => {
    setState({ ...state, modalOpen: false, newColumnTitle: '' });
  };

  const changeNewColumnTitle = (value: string) => {
    setState({ ...state, newColumnTitle: value });
  };
  const createNewColumn = () => {
    if (state.mockData) {
      createColumn(state.newColumnTitle, state.mockData?.board._id).then((columnData) => {
        const column: ColumnInterface = {
          _id: columnData.column._id,
          title: columnData.column.title,
          cards: [],
        };
        const mockData = state.mockData;
        if (mockData) {
          mockData.columns = {
            ...mockData.columns,
            [column._id]: column,
          };
          mockData.board.columns.push(column._id);
          setState({ ...state, mockData: mockData });
        }
      });
    }
  };

  const deleteColumn = (columnId: string) => {
    const mockData = state.mockData;
    if (mockData) {
      mockData.board.columns.splice(mockData.board.columns.indexOf(columnId), 1);
      mockData.columns[columnId].cards.forEach((card) => {
        delete mockData.cards[card];
      });
      delete mockData.columns[columnId];
      setState({ ...state, mockData: mockData });
      deleteColumnApi(columnId, mockData.board._id);
    }
  };

  const fillOutTasks = (columId: string) => {
    let tasks: Cards = {};
    state.mockData?.columns[columId].cards.map((taskId: string) => {
      const task = state.mockData?.cards[taskId];
      if (task !== undefined)
        tasks = {
          ...tasks,
          [task._id]: {
            _id: task._id,
            title: task.title,
            description: task.description,
            cardDetails: task.cardDetails,
          },
        };
    });

    return tasks;
  };
  const handleDetailedCardClose = (value: string) => {
    setState({ ...state, isDetailedCardOpen: false });
  };
  const openDetailedCard = (cardId: string) => {
    setState({ ...state, isDetailedCardOpen: true, openedCard: cardId });
  };

  if (state.mockData === undefined || state.mockData?.columns === undefined || state.mockData?.cards === undefined) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          alignContent="flex-start"
          spacing={0}
        >
          <Grid item xs={1} style={{ backgroundColor: 'grey', verticalAlign: 'center' }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              fontSize="10vw"
              onClick={newColumn}
            >
              <AddCircleOutlineIcon style={{ fontSize: '120px', color: 'white' }}></AddCircleOutlineIcon>
            </Box>
          </Grid>
          <Grid item xs>
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
              <Droppable droppableId="board" direction="horizontal" type="column">
                {(provided) => (
                  <Grid container direction="row" justifyContent="flex-start" ref={provided.innerRef}>
                    {state.mockData?.board.columns.map((Id, index) => (
                      <Column
                        Column={state.mockData?.columns[Id]}
                        key={Id}
                        Tasks={fillOutTasks(Id)}
                        index={index}
                        placeHolderStyle={state.taskPlaceHolder}
                        addTask={addTask}
                        taskDialog={newColumn}
                        delete={deleteColumn}
                        openDetailedCard={openDetailedCard}
                      ></Column>
                    ))}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>
        </Grid>
        <Modal
          open={state.modalOpen}
          onClose={modalClose}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Card className={classes.newColumnModal}>
            <CardHeader action={<CloseIcon onClick={modalClose}></CloseIcon>}></CardHeader>
            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center" className={classes.newColumnModalBox}>
                <div>
                  <Typography variant="h6" component="div">
                    <Box fontWeight={600} fontSize={20}>
                      Create a new column
                    </Box>
                  </Typography>
                </div>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" className={classes.newColumnModalBox}>
                <TextField
                  id="newColumn"
                  variant="outlined"
                  onChange={(event) => {
                    changeNewColumnTitle(event.target.value);
                  }}
                  placeholder="Add Title"
                  inputProps={{ style: { textAlign: 'center', color: 'black' } }}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" alignItems="center" className={classes.newColumnModalBox}>
                <Button color="primary" variant="contained" onClick={createNewColumn}>
                  Create
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Modal>
        <DetailedCardDialog
          open={state.isDetailedCardOpen}
          onClose={handleDetailedCardClose}
          selectedValue={'test'}
          selectedCard={state.openedCard}
        ></DetailedCardDialog>
      </React.Fragment>
    );
  }
};

export default Board;
