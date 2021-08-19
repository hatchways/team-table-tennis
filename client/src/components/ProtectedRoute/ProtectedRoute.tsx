import { useAuthBoard } from '../../context/useAuthBoardContext';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import loading from '../../Images/loading.gif';

export default function ProtectedRoute(component: RouteProps): JSX.Element {
  const { loggedInUserBoard: loggedInUser } = useAuthBoard();
  const auth = loggedInUser;

  if (!auth) return <img src={loading} />;
  else return auth ? <Route {...component} /> : <Redirect to={{ pathname: '/login' }} />;
}
