import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useWallet } from '../../../contexts/useWallet';

// ----------------------------------------------------------------------

export default function ConectionWalletButton() {
  const wallet = useWallet()

  const handleConnect = async () => {
    await wallet.connect()
  }

  return (

    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleConnect}>
      Connect Wallet
    </LoadingButton>

  );
}
