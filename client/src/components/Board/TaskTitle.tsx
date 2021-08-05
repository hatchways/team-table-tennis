import { Box, Input } from '@material-ui/core';
import { useState } from 'react';
import { Task } from '../../interface/Task';

interface properties {
  Task: Task;
}
const TaskTitle: React.FunctionComponent<properties> = (props: properties) => {
  const [state, setState] = useState({
    isEditing: false,
    Task: props.Task,
    value: '',
  });

  const startEditingTitle = () => {
    if (props.Task.isNew) {
      setState({ ...state, isEditing: true });
    }
  };

  const titleChange = (value: string) => {
    setState({ ...state, value: value });
  };

  const handleEnter = (key: string) => {
    if (key === 'Enter') {
      const task = state.Task;
      task.Name = state.value;
      setState({ ...state, isEditing: false, Task: task });
    }
  };
  if (state.isEditing) {
    return (
      <Box fontWeight={600} fontSize={20}>
        <Input
          defaultValue=""
          onKeyPress={(event) => {
            handleEnter(event.key);
          }}
          onChange={(event) => {
            titleChange(event.target.value);
          }}
        ></Input>
      </Box>
    );
  } else {
    return (
      <Box fontWeight={600} fontSize={20} onDoubleClick={startEditingTitle}>
        {props.Task.Name}
      </Box>
    );
  }
};

export default TaskTitle;
