import { useState } from 'react';
import Column from './Column';
import mockData from './MockData';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';

const Board = () => {
  const [state, setState] = useState(mockData);
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const start = state.columns[Number(source.droppableId)];
    const finish = state.columns[Number(destination.droppableId)];
    const startTasks = Array.from(start.Tasks);
    startTasks.splice(source.index, 1);
    if (start === finish) {
      startTasks.splice(destination.index, 0, Number(draggableId));
      const newColumn: any = {
        ...start,
        Tasks: startTasks,
      };
      const newColumns = state.columns;
      newColumns[Number(source.droppableId)] = newColumn;

      const newState = {
        ...state,
        columns: [...newColumns],
      };
      setState(newState);
    } else {
      console.log('other column');
      // Move to another column
      const finishTasks = Array.from(finish.Tasks);
      finishTasks.splice(destination.index, 0, Number(draggableId));
      const destinationColumn: any = {
        ...finish,
        Tasks: finishTasks,
      };
      const sourceColumn: any = {
        ...start,
        Tasks: startTasks,
      };

      const newColumns = state.columns;
      newColumns[Number(destination.droppableId)] = destinationColumn;
      newColumns[Number(source.droppableId)] = sourceColumn;

      const newState = {
        ...state,
        columns: [...newColumns],
      };
      setState(newState);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container direction="row" justify="center">
        {state.columns.map((column: any) => (
          <Column
            Column={column}
            key={column.Id}
            Tasks={column.Tasks.map((task: number) => state.tasks[task])}
          ></Column>
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default Board;
