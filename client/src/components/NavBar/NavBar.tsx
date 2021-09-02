import React from 'react';
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/';
import { CalendarTodayOutlined, DashboardOutlined } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import AccountButton from '../AccountButton/AccountButton';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { createBoard } from '../../helpers/APICalls/board';
import BoardTitle from './BoardTitle';

type Anchor = 'right';

export default function NavBar() {
  const { loggedInUserBoard: userBoard, changeBoard } = useAuthBoard();
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [boardTitles, setBoardTitles] = React.useState({ titles: userBoard!.boardTitles });
  const [state, setState] = React.useState({
    right: false,
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const changeBoardTitles = (titles: string[]) => {
    setBoardTitles({ titles: titles });
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleCreateBoard = () => {
    if (userBoard?.board && userBoard.user) {
      const newBoardTitle = 'New Board';
      createBoard(newBoardTitle, userBoard.user._id).then((data) => {
        userBoard.user = data.success.user;
        userBoard.boardTitles.push(newBoardTitle);
        setBoardTitles({ titles: userBoard.boardTitles });
      });
    }
  };
  const handleChangeBoard = (index: number) => {
    changeBoard(index);
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <AccountButton />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.createboardButtonHamburger}
            startIcon={<AddIcon />}
          >
            Create board
          </Button>
        </ListItem>
        <ListItem className={classes.calendarButtonHamburger}>
          <Link to="/calendar" style={{ color: '#000', textDecoration: 'none' }}>
            <Button size="large" startIcon={<CalendarTodayOutlined />} className={classes.buttonFonts}>
              Calendar
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.calendarButtonHamburger}>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Button size="large" startIcon={<DashboardOutlined />} className={classes.buttonFonts}>
              Dashboard
            </Button>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Container className={classes.root}>
      <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.topnavBar}>
        <Grid item xs={3}>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justify-content="flex-start"
            className={classes.kanLogo}
          >
            <img src={logo} alt="logo" />
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.mainhamburgerMenu}>
          <Grid container alignItems="center" justifyContent="flex-end">
            {(['right'] as Anchor[]).map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon />{' '}
                </Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" justifyContent="flex-end">
            <Grid item className={classes.dashboardButton}>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button size="large" startIcon={<DashboardOutlined />} className={classes.buttonFonts}>
                  Dashboard
                </Button>
              </Link>
            </Grid>
            <Grid item className={classes.calendarButton}>
              <Link to="/calendar" style={{ color: '#000', textDecoration: 'none' }}>
                <Button size="large" startIcon={<CalendarTodayOutlined />} className={classes.buttonFonts}>
                  Calendar
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" justifyContent="flex-end">
            <Grid>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.createboardButton}
                startIcon={<AddIcon />}
                onClick={handleCreateBoard}
              >
                Create board
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container alignItems="center" justifyContent="flex-end" className={classes.accountButton}>
            <Grid>
              <AccountButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AppBar position="static" className={classes.appbarStyle}>
        <Toolbar>
          <BoardTitle
            title={userBoard!.board.title}
            selectedIndex={userBoard!.selectedBoardIndex}
            changeBoardTitles={changeBoardTitles}
          />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <AppsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.boardHeader}>
          <ListItem>
            <StorageOutlinedIcon className={classes.iconspaceHamburger} /> All boards
          </ListItem>
        </List>
        <Divider />
        <List>
          {boardTitles.titles.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <LabelOutlinedIcon
                    onClick={() => {
                      handleChangeBoard(index);
                    }}
                  />
                ) : (
                  <LabelOutlinedIcon
                    onClick={() => {
                      handleChangeBoard(index);
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={boardTitles.titles[index]}
                onClick={() => {
                  handleChangeBoard(index);
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}
