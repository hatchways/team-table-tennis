import { Button, Card, CardActions, CardContent, CardHeader, Container } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';
import Task from './Task';
const Column = (props: any) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={props.Column.Id} index={props.index}>
      {(provided) => (
        <Card className={classes.column} {...provided.draggableProps} ref={provided.innerRef}>
          <CardHeader
            title={props.Column.Title}
            titleTypographyProps={{ variant: 'h5' }}
            className={classes.columnTitle}
            {...provided.dragHandleProps}
          ></CardHeader>
          <Droppable droppableId={props.Column.Id} type="task">
            {(provided) => (
              <CardContent ref={provided.innerRef} {...provided.droppableProps}>
                {props.Tasks.map((task: any, index: number) => (
                  <Task key={task.Id} task={task} index={index}></Task>
                ))}
                {provided.placeholder}
              </CardContent>
            )}
          </Droppable>
          <CardActions>
            <Button color="primary" variant="contained" style={{ marginLeft: 10, marginBottom: 10 }}>
              Add a card
            </Button>
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
};

export default Column;
