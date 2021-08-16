import { Box, Input } from '@material-ui/core';
import { useState } from 'react';
import { Card as Task } from '../../interface/CardApi';

interface properties {
  Task: Task | undefined;
}
const TaskTitle: React.FunctionComponent<properties> = (props: properties) => {
  const [state, setState] = useState({
    isEditing: false,
    Task: props.Task,
    value: '',
  });

  const startEditingTitle = () => {
    if (props.Task) {
      if (props.Task.isNew) {
        setState({ ...state, isEditing: true });
      }
    }
  };

  const titleChange = (value: string) => {
    setState({ ...state, value: value });
  };

  const handleEnter = (key: string) => {
    if (key === 'Enter') {
      const task = state.Task;
      if (task) task.name = state.value;
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
        {props.Task?.name}
      </Box>
    );
  }
};

export default TaskTitle;
