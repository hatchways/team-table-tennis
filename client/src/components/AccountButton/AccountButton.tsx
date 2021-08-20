import React from 'react';
import { Container, IconButton } from '@material-ui/core/';
import useStyles from './useStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/base';
import { useAuthBoard } from '../../context/useAuthBoardContext';

export default function AccountButton() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuthBoard();
  const { loggedInUserBoard } = useAuthBoard();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dmqrgfx4k',
    },
  });

  const myImage = cld.image('KanbanCloud/' + `${loggedInUserBoard?.user?._id}`);

  return (
    <Container className={classes.root}>
      <div>
        <IconButton
          className={classes.accBtn}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AdvancedImage className={classes.accBtn} cldImg={myImage} width="300" crop="scale" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <Link to="/profile" style={{ color: '#000', textDecoration: 'none' }}>
            {' '}
            <MenuItem>Go to profile</MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </Container>
  );
}
