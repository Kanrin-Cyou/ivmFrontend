import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Profile(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {console.log('avatar',props.user.avatar)}
      <Avatar alt={props.user.name} src={props.user.avatar} aria-controls="profile-menu" aria-haspopup="true" onClick={handleClick}/>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{props.toggleModal();handleClose()}}>View Profile</MenuItem>
        <MenuItem onClick={props.Signout}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}
