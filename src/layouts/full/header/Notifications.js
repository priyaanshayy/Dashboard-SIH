import React, { useState } from 'react';
import { Avatar, Box, Menu, IconButton, MenuItem, ListItemIcon, ListItemText, Typography, Badge } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';
import { notifications } from './data'; // Ensure the path to 'data' is correct

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        aria-controls="notifications-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: 'text.primary',
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <IconBellRinging size="24" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* Notifications Dropdown */}
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}  // Changed to left
        transformOrigin={{ horizontal: 'left', vertical: 'top' }} // Changed to left
        sx={{
          '& .MuiMenu-paper': {
            width: '320px',
            backgroundColor: 'background.paper',
            boxShadow: (theme) => theme.shadows[4],
            borderRadius: '8px',
            padding: '8px',
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            padding: '10px 14px',
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          Notifications
        </Typography>
        <Box sx={{ padding: '8px 0' }} /> {/* Added gap here */}
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <ListItemText primary="No notifications available" />
          </MenuItem>
        ) : (
          notifications.map((notification, index) => (
            <MenuItem
              key={index}
              onClick={handleClose}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                borderRadius: '8px',
                marginBottom: '4px',
              }}
            >
              <ListItemIcon>
                <Avatar
                  src={notification.avatar}
                  alt={notification.title}
                  sx={{
                    width: 30,
                    height: 30,
                    border: '2px solid',
                    borderColor: 'primary.main',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={notification.subtitle}
                primaryTypographyProps={{
                  color: 'text.primary',
                  fontWeight: 'bold',
                }}
                secondaryTypographyProps={{
                  color: 'text.secondary',
                }}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default Notifications;
