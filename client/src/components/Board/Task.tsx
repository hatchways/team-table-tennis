import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Draggable } from 'react-beautiful-dnd';
const Task = (props: any) => {
  return (
    <Draggable draggableId={props.task.Id} index={props.index}>
      {(provided) => (
        <Card {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <CardHeader title={props.task.Name}></CardHeader>
        </Card>
      )}
    </Draggable>
  );
};

export default Task;
