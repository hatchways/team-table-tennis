import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { CardActions, CardContent, Collapse, Divider, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { FiberManualRecord } from '@material-ui/icons';
import { Card as TaskInterface } from '../../interface/CardApi';
import TaskTitle from './TaskTitle';
import { quickUpdate } from '../../helpers/APICalls/cards';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import moment from 'moment';

interface properties {
  task: TaskInterface | undefined;
  index: number;
  openDetailedCard: (cardId: string) => void;
}

const Task: React.FunctionComponent<properties> = (props: properties) => {
  const colors = ['#FFFFFF', '#FF5D48', '#EDAB1D', '#59B0FF', '#D460F7'];
  const [state, setState] = useState({
    isDragging: true,
    task: props.task,
  });

  const { loggedInUserBoard: userBoard } = useAuthBoard();

  const task = state.task;

  const classes = useStyles();

  const changeColor = (color: string) => {
    const task = state.task;
    if (task) {
      task.cardDetails.color = color;
      if (task.cardDetails.color !== colors[0]) {
        quickUpdate(task._id, task.title, task.cardDetails.color);
        if (userBoard) {
          userBoard.cards[task._id].title = task.title;
        }
      }
    }
    setState({ ...state, task: task });
  };
  const taskClassName = (dragging: boolean) => {
    let output = classes.task;
    if (dragging) {
      output += ' ' + classes.taskDragging;
    }
    if (state.task) {
      if (state.task.cardDetails.color === colors[0]) {
        output += ' ' + classes.taskNew;
      }
    }
    return output;
  };
  const clickHandler = () => {
    if (props.task?.cardDetails.color != colors[0]) props.openDetailedCard(task!._id);
  };

  const getDate = () => {
    const date = state.task?.cardDetails.deadLine;
    return moment(date).format('MMMM D');
  };
  if (state.task) {
    return (
      <Draggable draggableId={'' + state.task?._id} index={props.index}>
        {(provided, snapshot) => (
          <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
            <Card
              elevation={0}
              className={taskClassName(snapshot.isDragging) + ' ' + 'taskClass-' + props.task?._id}
              onDoubleClick={clickHandler}
            >
              <CardHeader
                title={
                  <div>
                    <RemoveRoundedIcon
                      style={{ transform: 'scale(4)', width: 50 }}
                      htmlColor={state.task?.cardDetails.color}
                    ></RemoveRoundedIcon>
                    <br></br>
                    <Typography variant="h6" component="div">
                      <TaskTitle Task={state.task} newColor={colors[0]}></TaskTitle>
                    </Typography>
                  </div>
                }
                subheader={
                  <Typography color="textSecondary" variant="h6" className={classes.selectTag}>
                    {getDate()}
                  </Typography>
                }
              ></CardHeader>
              <Collapse in={state.task?.cardDetails.color === colors[0]}>
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
  } else {
    return <></>;
  }
};

export default Task;
