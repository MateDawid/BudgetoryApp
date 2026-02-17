import { Stack, CircularProgress } from '@mui/material';
import React from 'react';

export const LoadingOverlay = () => (
  <foreignObject width="100%" height="100%">
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <CircularProgress size="3rem" />
    </Stack>
  </foreignObject>
);
