import React, { useState } from 'react';
import Column from './Column';
import { Column as ColumnInterface } from '../../interface/Column';
import { TaskPlaceHolder, Tasks } from '../../interface/Task';
import mockData from './MockData';
import { DragDropContext, DropResult, Droppable, DragUpdate } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';
const Board: React.FunctionComponent = () => {
  const taskPlaceHolder: TaskPlaceHolder = { clientHeight: 0, clientWidth: 0, clientX: 0, clientY: 0 };

  const [state, setState] = useState({
    mockData: mockData,
    taskPlaceHolder: taskPlaceHolder,
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
      [taskId]: { Name: 'New Task', Date: '', Color: '#EDAB1D', Id: taskId, isNew: true },
    };
    console.log(mockData.tasks);
    mockData.columns[columnId].Tasks.push(taskId);
    setState({ ...state, mockData });
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <Grid container direction="row" justify="center" ref={provided.innerRef}>
              {state.mockData.columnOrder.map((Id, index) => (
                <Column
                  Column={state.mockData.columns[Id]}
                  key={Id}
                  Tasks={state.mockData.columns[Id].Tasks.map((task: string) => state.mockData.tasks[task])}
                  index={index}
                  placeHolderStyle={state.taskPlaceHolder}
                  AddTask={addTask}
                ></Column>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
};

export default Board;
