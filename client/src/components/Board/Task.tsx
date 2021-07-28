import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { CardContent, Collapse } from '@material-ui/core';
import { useState } from 'react';
import { FiberManualRecord } from '@material-ui/icons';
const Task = (props: any) => {
  const classes = useStyles();
  const colors = ['#FFFFFF', '#FF5D48', '#EDAB1D', '#59B0FF', '#D460F7'];
  const [state, setState] = useState({ expanded: false, color: props.task.Color });
  const expandHandler = () => {
    const expanded = !state.expanded;
    setState({ ...state, expanded: expanded });
  };
  const changeColor = (color: string) => {
    setState({ ...state, color: color });
  };
  return (
    <Draggable draggableId={props.task.Id} index={props.index}>
      {(provided) => (
        <Card
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={classes.task}
        >
          <RemoveRoundedIcon
            style={{ fontSize: 75 }}
            htmlColor={state.color}
            onClick={expandHandler}
          ></RemoveRoundedIcon>
          <CardHeader
            title={props.task.Name}
            titleTypographyProps={{ variant: 'h6' }}
            onClick={expandHandler}
          ></CardHeader>
          <Collapse in={state.expanded}>
            <CardContent>
              {colors.map((color, index) => (
                <FiberManualRecord
                  htmlColor={color}
                  key={index}
                  onClick={() => {
                    changeColor(color);
                  }}
                ></FiberManualRecord>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </Draggable>
  );
};

export default Task;
