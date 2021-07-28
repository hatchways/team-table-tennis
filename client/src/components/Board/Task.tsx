import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Draggable } from 'react-beautiful-dnd';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
const Task = (props: any) => {
  return (
    <Draggable draggableId={props.task.Id} index={props.index}>
      {(provided) => (
        <Card {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <RemoveRoundedIcon style={{ fontSize: 75 }} htmlColor={props.task.Color}></RemoveRoundedIcon>
          <CardHeader title={props.task.Name} titleTypographyProps={{ variant: 'h6' }}></CardHeader>
        </Card>
      )}
    </Draggable>
  );
};

export default Task;
