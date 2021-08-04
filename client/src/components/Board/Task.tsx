import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { Box, CardActions, CardContent, Collapse, Divider, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { FiberManualRecord } from '@material-ui/icons';
import { Task as TaskInterface } from '../../interface/Task';

interface properties {
  task: TaskInterface;
  index: number;
}
const Task: React.FunctionComponent<properties> = (props: properties) => {
  const colors = ['#FFFFFF', '#FF5D48', '#EDAB1D', '#59B0FF', '#D460F7'];
  const [state, setState] = useState({
    color: props.task.Color,
    isDragging: true,
    isNew: props.task.isNew,
  });

  const classes = useStyles();

  const changeColor = (color: string) => {
    setState({ ...state, color: color });
  };
  const taskClassName = (dragging: boolean) => {
    if (dragging) {
      return classes.task + ' ' + classes.taskDragging;
    } else {
      return classes.task;
    }
  };
  return (
    <Draggable draggableId={props.task.Id} index={props.index}>
      {(provided, snapshot) => (
        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <Card elevation={0} className={taskClassName(snapshot.isDragging) + ' ' + 'taskClass-' + props.task.Id}>
            <CardHeader
              title={
                <>
                  <RemoveRoundedIcon
                    style={{ transform: 'scale(4)', width: 50 }}
                    htmlColor={state.color}
                  ></RemoveRoundedIcon>
                  <br></br>
                  <Typography variant="h6" component="div">
                    <Box fontWeight={600} fontSize={20}>
                      {props.task.Name}
                    </Box>
                  </Typography>
                </>
              }
              subheader={
                <Typography color="textSecondary" variant="h6" className={classes.selectTag}>
                  {props.task.Date}
                </Typography>
              }
            ></CardHeader>
            <Collapse in={state.isNew}>
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
