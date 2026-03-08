import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AlertContext } from '../../store/AlertContext';
import { removeTokens } from '../../../app_users/services/LoginService';

export const useLogout = () => {
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);

  return () => {
    removeTokens();
    setAlert(null);
    navigate('/login');
  };
};
