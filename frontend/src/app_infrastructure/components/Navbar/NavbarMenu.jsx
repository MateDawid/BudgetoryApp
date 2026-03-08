// src/components/NavbarMenu.tsx
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { Box, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { navConfig } from '../navConfig';
import { Logout } from '@mui/icons-material';
import { useLogout } from './useLogout';

const StyledListHeader = Object.assign(
  styled(ListSubheader)({
    backgroundImage: 'var(--Paper-overlay)',
  }),
  {
    muiSkipListHighlight: true,
  }
);

/**
 * NavbarMenu component to display Leftbar menu on small screens.
 */
export default function NavbarMenu({ ...props }) {
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
  };

  return (
    <Box {...props}>
      <IconButton color="inherit" onClick={handleClick}>
        <MenuIcon />
      </IconButton>

      <Menu
        id="grouped-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { 'aria-labelledby': 'basic-button', sx: { py: 0 } },
        }}
      >
        {navConfig.map((section) => (
          <React.Fragment key={section.title}>
            <StyledListHeader disableSticky>{section.title}</StyledListHeader>

            {section.items.map((item) => (
              <MenuItem
                key={item.url}
                component={RouterLink}
                to={item.url}
                onClick={handleClose}
                sx={{ gap: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            ))}
          </React.Fragment>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
