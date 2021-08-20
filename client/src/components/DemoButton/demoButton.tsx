import React from 'react';
import { Button } from '@material-ui/core';
import { loginBoard } from '../../helpers/APICalls/login';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { registerBoard } from '../../helpers/APICalls/register';

export default function DemoButton(): JSX.Element {
  const email = 'demo@hatchway.io';
  const password = '123123';

  const { updateLoginContext } = useAuthBoard();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (): void => {
    console.log('before demo');
    registerBoard(email, password, true).then(() => {
      loginBoard(email, password, true).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          console.log('demo success');
          updateLoginContext(data.success, true);
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    });
  };

  return (
    <Button type="submit" color="primary" onClick={handleSubmit}>
      Try Demo
    </Button>
  );
}
