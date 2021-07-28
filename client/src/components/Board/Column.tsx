import { Card, CardContent, CardHeader, Container } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
const Column = (props: any) => {
  return (
    <Card>
      <CardHeader title={props.Column.Title}></CardHeader>
      <Droppable droppableId={props.Column.Id}>
        {(provided) => (
          <CardContent ref={provided.innerRef} {...provided.droppableProps}>
            {props.Tasks.map((task: any, index: number) => (
              <Task key={task.Id} task={task} index={index}></Task>
            ))}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
    </Card>
  );
};

export default Column;
