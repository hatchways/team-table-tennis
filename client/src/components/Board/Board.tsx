import { useState } from 'react';
import Column from './Column';
import { Column as ColumnType } from '../../interface/Column';
import mockData from './MockData';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';

const Board = () => {
  const [state, setState] = useState(mockData);
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      console.log('moved column');
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      setState({ ...state, columnOrder: newColumnOrder });

      return;
    } else {
      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];
      const startTasks = Array.from(start.Tasks);
      startTasks.splice(source.index, 1);
      if (start === finish) {
        startTasks.splice(destination.index, 0, draggableId);
        const newColumn: any = {
          ...start,
          Tasks: startTasks,
        };
        const newColumns = state.columns;
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
        const destinationColumn: any = {
          ...finish,
          Tasks: finishTasks,
        };
        const sourceColumn: any = {
          ...start,
          Tasks: startTasks,
        };

        const newColumns = state.columns;
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <Grid container direction="row" justify="center" ref={provided.innerRef}>
            {state.columnOrder.map((Id, index) => (
              <Column
                Column={state.columns[Id]}
                key={Id}
                Tasks={state.columns[Id].Tasks.map((task: string) => state.tasks[task])}
                index={index}
              ></Column>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
