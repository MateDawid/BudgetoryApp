import React, { useContext } from 'react';
import { GridPagination } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import StyledButton from '../StyledButton';
import { WalletContext } from '../../store/WalletContext';

/**
 * DataTableFooter component for DataTable custom footer with Add button.
 * @param {object} props
 * @param {function} props.handleAddClick - Function to handle Add button click.
 * @param {object} props.props - Other properties.
 */
const DataGridFooterWithAdd = ({ handleAddClick, ...props }) => {
  const { contextWalletId } = useContext(WalletContext);

  return (
    <>
      <StyledButton
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
        disabled={!contextWalletId}
        sx={{ marginLeft: 1 }}
      >
        Add
      </StyledButton>
      <GridPagination {...props} />
    </>
  );
};

export default DataGridFooterWithAdd;
