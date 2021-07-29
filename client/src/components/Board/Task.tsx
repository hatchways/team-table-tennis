import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { CardActions, CardContent, Collapse, Divider, Grid, Typography } from '@material-ui/core';
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
          <CardHeader
            title={
              <>
                <RemoveRoundedIcon
                  style={{ transform: 'scale(4)', width: 50 }}
                  htmlColor={state.color}
                  onClick={expandHandler}
                ></RemoveRoundedIcon>
                <br></br>
                <strong>{props.task.Name}</strong>
              </>
            }
            onClick={expandHandler}
          ></CardHeader>
          <Collapse in={state.expanded}>
            <CardContent>
              <Divider></Divider>
            </CardContent>
            <CardActions>
              <Grid container direction="row" alignItems="center" alignContent="center">
                <Grid item xs={8}>
                  <Typography variant="h6">Select Tag</Typography>
                </Grid>
                <Grid item xs={4}>
                  {colors.map((color, index) => (
                    <FiberManualRecord
                      style={{ stroke: 'black', strokeWidth: 1 }}
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
      )}
    </Draggable>
  );
};

export default Task;
