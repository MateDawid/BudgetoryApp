import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Container,
  Paper,
  TextField,
  Tooltip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import Button from '@mui/material/Button';
import { demoLogIn, getAccessToken, logIn } from '../services/LoginService';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import { AlertContext } from '../../app_infrastructure/store/AlertContext';

/**
 * LoginForm component handles user login.
 * It manages the email and password input fields,
 * validates the input, and performs login process.
 */
function LoginForm() {
  document.title = 'Budgetory';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { alert, setAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  useEffect(() => {
    /**
     * Asynchronously obtains access token. If token exists, navigates to landing page.
     */
    const checkIfTokenExists = async () => {
      getAccessToken().then((token) => {
        if (token) {
          navigate('/');
        }
      });
    };
    checkIfTokenExists();
  }, [isLoggedIn]);

  /**
   * Handles form submission.
   * Validates input fields and calls API to perform login.
   * @param {Object} data - Form data.
   */
  const onSubmit = async (data) => {
    handleLogIn(data);
  };

  /**
   * Handles log in.
   */
  const handleLogIn = async (loginData = undefined, isDemoLogin = false) => {
    let response;
    let isError;
    try {
      if (isDemoLogin) {
        setDemoLoading(true);
        ({ response, isError } = await demoLogIn());
      } else {
        ({ response, isError } = await logIn(
          loginData.email,
          loginData.password
        ));
      }

      if (isError) {
        setAlert({
          type: 'error',
          message:
            response.response?.data?.detail?.non_field_errors ||
            response.response?.data?.detail ||
            response.error ||
            'An error occurred. Please try again.',
        });
      } else {
        if (isDemoLogin) setDemoLoading(false);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message:
          error.response.data.message ||
          'Network error. Please try again later.',
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Typography
          variant="h6"
          sx={{
            textDecoration: 'none',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textAlign: 'center',
            width: '100%',
            marginBottom: 1,
          }}
        >
          BUDGETORY
        </Typography>
        <Avatar
          sx={{
            mx: 'auto',
            bgcolor: '#BD0000',
            textAlign: 'center',
            mb: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Log in
        </Typography>
        {alert && (
          <Alert
            sx={{ marginTop: 2, marginBottom: 2, whiteSpace: 'pre-wrap' }}
            severity={alert.type}
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: 'Email is required',
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1, bgcolor: '#BD0000' }}
          >
            Log in
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 2, mb: 1 }}
        >
          New to Budgetory?
        </Typography>

        <Button
          component={RouterLink}
          to="/register"
          variant="contained"
          fullWidth
          sx={{ mt: 0, bgcolor: '#BD0000' }}
        >
          Register
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <Button
            onClick={() => handleLogIn({}, true)}
            variant="outlined"
            fullWidth
            sx={{
              borderColor: '#BD0000',
              color: '#BD0000',
              minHeight: '36.5px', // Prevents button from growing
              '&:hover': {
                borderColor: '#BD0000',
                bgcolor: 'rgba(189, 0, 0, 0.04)',
              },
            }}
          >
            {demoLoading && (
              <CircularProgress
                size={20} // Match approximate text height
                sx={{ color: '#BD0000' }}
              />
            )}
            {!demoLoading && 'Demo Log in'}
          </Button>
          <Tooltip
            title="Try Budgetory with sample data without registration."
            placement="top"
          >
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" sx={{ color: '#BD0000' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginForm;
