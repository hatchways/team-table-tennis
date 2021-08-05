import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { CardActions, CardContent, Collapse, Divider, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { FiberManualRecord } from '@material-ui/icons';
import { Task as TaskInterface } from '../../interface/Task';
import TaskTitle from './TaskTitle';

interface properties {
  task: TaskInterface;
  index: number;
  isNew: boolean;
}

const Task: React.FunctionComponent<properties> = (props: properties) => {
  const colors = ['#FFFFFF', '#FF5D48', '#EDAB1D', '#59B0FF', '#D460F7'];
  const [state, setState] = useState({
    isDragging: true,
    task: props.task,
  });

  const classes = useStyles();

  const changeColor = (color: string) => {
    const task = state.task;
    task.Color = color;
    task.isNew = false;
    setState({ ...state, task: task });
  };
  const taskClassName = (dragging: boolean) => {
    let output = classes.task;
    if (dragging) {
      output += ' ' + classes.taskDragging;
    }
    if (state.task.isNew) {
      output += ' ' + classes.taskNew;
    }
    return output;
  };

  return (
    <Draggable draggableId={state.task.Id} index={props.index}>
      {(provided, snapshot) => (
        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <Card elevation={0} className={taskClassName(snapshot.isDragging) + ' ' + 'taskClass-' + props.task.Id}>
            <CardHeader
              title={
                <div>
                  <RemoveRoundedIcon
                    style={{ transform: 'scale(4)', width: 50 }}
                    htmlColor={state.task.Color}
                  ></RemoveRoundedIcon>
                  <br></br>
                  <Typography variant="h6" component="div">
                    <TaskTitle Task={state.task}></TaskTitle>
                  </Typography>
                </div>
              }
              subheader={
                <Typography color="textSecondary" variant="h6" className={classes.selectTag}>
                  {state.task.Date}
                </Typography>
              }
            ></CardHeader>
            <Collapse in={state.task.isNew}>
              <CardContent>
                <Divider></Divider>
              </CardContent>
              <CardActions>
                <Grid container direction="row" alignItems="center" alignContent="center">
                  <Grid item xs={6}>
                    <Typography color="textSecondary" variant="h6" className={classes.selectTag}>
                      Select Tag:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ display: 'flex' }}>
                    {colors.map((color, index) => (
                      <FiberManualRecord
                        style={{ stroke: '#E2E8F6', strokeWidth: color === colors[0] ? 1 : 0, fontSize: 30 }}
                        htmlColor={color}
                        key={index}
                        onClick={() => {
                          changeColor(color);
                        }}
                      ></FiberManualRecord>
                    ))}
                  </Grid>
                </Grid>
              </CardActions>
            </Collapse>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
