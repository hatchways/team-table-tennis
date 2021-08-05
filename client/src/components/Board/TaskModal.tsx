import { Card, CardHeader } from '@material-ui/core';
import { useState } from 'react';
import { Tasks } from '../../interface/Task';
import useStyles from './useStyles';
interface properties {
  tasks: Tasks;
  selectedTask: string;
}

const TaskModal: React.FunctionComponent<properties> = (props: properties) => {
  const classes = useStyles();

  if (props.tasks[props.selectedTask] == null) {
    return <></>;
  } else {
    return (
      <Card>
        <CardHeader title={props.tasks[props.selectedTask].Name}></CardHeader>
      </Card>
    );
  }
};
export default TaskModal;
