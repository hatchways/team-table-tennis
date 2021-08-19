import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';
import Calendar from './pages/Calendar/Calendar';
import Profile from './pages/Profile/Profile';
import { AuthBoardProvider } from './context/useAuthBoardContext';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthBoardProvider>
            <SocketProvider>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
                <Route exact path="/calendar">
                  <Calendar />
                </Route>
              </Switch>
            </SocketProvider>
          </AuthBoardProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
