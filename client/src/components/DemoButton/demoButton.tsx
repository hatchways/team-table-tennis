import React from 'react';
import { Button } from '@material-ui/core';
import { loginBoard } from '../../helpers/APICalls/login';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function DemoButton(): JSX.Element {
  const email = '';
  const password = '';

  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = ({ email, password }: { email: string; password: string }): void => {
    loginBoard(email, password).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <form onSubmit={() => handleSubmit({ email, password })}>
      <Button type="submit" color="primary">
        Try Demo
      </Button>
    </form>
  );
}
