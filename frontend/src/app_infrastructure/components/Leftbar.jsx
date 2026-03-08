// src/components/Leftbar.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { ListSubheader, styled } from '@mui/material';
import LeftbarItem from './LeftbarItem';
import { navConfig } from './navConfig';

const StyledListSubheader = styled(ListSubheader)({
  color: '#FFFFFF',
  backgroundColor: '#252525',
});

/**
 * Leftbar component to display subpages navigation on left side of screen
 */
const Leftbar = () => {
  return (
    <Box
      width={180}
      height="100%"
      sx={{
        zIndex: 999,
        backgroundColor: '#252525',
        display: { xs: 'none', sm: 'none', md: 'block' },
      }}
    >
      <Box
        position="fixed"
        height="100%"
        width={180}
        sx={{ backgroundColor: '#252525', overflow: 'auto' }}
      >
        <List>
          {navConfig.map((section) => (
            <React.Fragment key={section.title}>
              <StyledListSubheader>{section.title}</StyledListSubheader>
              {section.items.map((item) => (
                <LeftbarItem
                  key={item.url}
                  url={item.url}
                  displayText={item.label}
                  icon={item.icon}
                />
              ))}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Leftbar;
