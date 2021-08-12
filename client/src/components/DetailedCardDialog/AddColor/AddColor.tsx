import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import useStyles from './useStyles';
import { IconButton, Grid } from '@material-ui/core';
import FormatColorFillOutlinedIcon from '@material-ui/icons/FormatColorFillOutlined';
import { FiberManualRecord } from '@material-ui/icons';
import { Task as TaskInterface } from '../../../interface/Task';

export default function AddColor() {
  const classes = useStyles();
  const colors = ['#FFFFFF', '#FF5D48', '#EDAB1D', '#59B0FF', '#D460F7'];
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ expanded: false, color: colors, isDragging: true });
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const changeColor = (color: string) => {
    setState({ ...state, color: colors });
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Grid className={classes.root}>
      <Grid>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <FormatColorFillOutlinedIcon />
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
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
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}
