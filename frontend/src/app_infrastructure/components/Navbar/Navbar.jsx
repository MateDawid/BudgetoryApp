import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';
import NavbarMenu from './NavbarMenu';
import { useLogout } from './useLogout';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

/**
 * Navbar component to display navigation bar on top of the page.
 */
const Navbar = () => {
  const logout = useLogout();

  /**
   * Handles User logout.
   */
  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#BD0000' }}>
      <StyledToolbar>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{
            textDecoration: 'none',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
          }}
        >
          BUDGETORY
        </Typography>
        <Button
          color="inherit"
          onClick={handleLogout}
          sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
        >
          Logout
        </Button>
        <NavbarMenu sx={{ display: { sm: 'block', md: 'none' } }} />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
