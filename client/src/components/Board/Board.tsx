import React, { useState } from 'react';
import Column from './Column';
import { Column as ColumnInterface } from '../../interface/Column';
import { TaskPlaceHolder } from '../../interface/Task';
import mockData from './MockData';
import { DragDropContext, DropResult, Droppable, DragUpdate } from 'react-beautiful-dnd';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Modal, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import useStyles from './useStyles';
const Board: React.FunctionComponent = () => {
  const taskPlaceHolder: TaskPlaceHolder = { clientHeight: 0, clientWidth: 0, clientX: 0, clientY: 0 };
  const classes = useStyles();

  const [state, setState] = useState({
    mockData: mockData,
    taskPlaceHolder: taskPlaceHolder,
    modalOpen: false,
    newColumnTitle: '',
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
      const newColumnOrder = Array.from(state.mockData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const mockData = state.mockData;
      mockData.columnOrder = newColumnOrder;
      setState({ ...state, mockData });

      return;
    } else {
      const start = state.mockData.columns[source.droppableId];

      const finish = state.mockData.columns[destination.droppableId];
      const startTasks = Array.from(start.Tasks);
      startTasks.splice(source.index, 1);
      if (start === finish) {
        startTasks.splice(destination.index, 0, draggableId);
        const newColumn: ColumnInterface = {
          ...start,
          Tasks: startTasks,
        };

        const newColumns = state.mockData.columns;
        newColumns[source.droppableId] = newColumn;

        const newState = {
          ...state,
          columns: newColumns,
        };
        setState(newState);
      } else {
        // Move to another column
        const finishTasks = Array.from(finish.Tasks);
        finishTasks.splice(destination.index, 0, draggableId);
        const destinationColumn: ColumnInterface = {
          ...finish,
          Tasks: finishTasks,
        };
        const sourceColumn: ColumnInterface = {
          ...start,
          Tasks: startTasks,
        };

        const newColumns = state.mockData.columns;
        newColumns[destination.droppableId] = destinationColumn;
        newColumns[source.droppableId] = sourceColumn;

        const newState = {
          ...state,
          columns: newColumns,
        };
        setState(newState);
      }
    }
  };

  const addTask = (columnId: string) => {
    const taskId = 'task-' + (Object.keys(state.mockData.tasks).length + 1);
    const mockData = state.mockData;
    mockData.tasks = {
      ...mockData.tasks,
      [taskId]: { Name: 'Add title...', Date: '', Color: '#ffffff', Id: taskId, isNew: true },
    };
    mockData.columns[columnId].Tasks.push(taskId);
    setState({ ...state, mockData });
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
    const mockData = state.mockData;
    const newColumnId = 'col-' + (mockData.columnOrder.length + 1);
    mockData.columns = {
      ...mockData.columns,
      [newColumnId]: { Title: state.newColumnTitle, Id: newColumnId, Tasks: [] },
    };
    mockData.columnOrder.push(newColumnId);
    setState({ ...state, newColumnTitle: '', mockData: mockData });
  };

  return (
    <React.Fragment>
      <Grid container direction="row" justify="flex-start" alignItems="stretch" alignContent="flex-start" spacing={0}>
        <Grid
          item
          xs={1}
          className={classes.newColumn}
          style={{ backgroundColor: 'grey', verticalAlign: 'center' }}
          alignItems="center"
          justify="center"
        >
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
                <Grid container direction="row" justify="flex-start" ref={provided.innerRef}>
                  {state.mockData.columnOrder.map((Id, index) => (
                    <Column
                      Column={state.mockData.columns[Id]}
                      key={Id}
                      Tasks={state.mockData.columns[Id].Tasks.map((task: string) => state.mockData.tasks[task])}
                      index={index}
                      placeHolderStyle={state.taskPlaceHolder}
                      addTask={addTask}
                      taskDialog={newColumn}
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
        <Card>
          <CardHeader title="Create a new column" action={<CloseIcon onClick={modalClose}></CloseIcon>}></CardHeader>
          <CardContent>
            <TextField
              id="newColumn"
              label="Add Title"
              variant="outlined"
              style={{ textAlign: 'center' }}
              onChange={(event) => {
                changeNewColumnTitle(event.target.value);
              }}
            />
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained" onClick={createNewColumn}>
              Create
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </React.Fragment>
  );
};

export default Board;
