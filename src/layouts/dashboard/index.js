import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '../../contexts/useAuth';
import { useWallet } from '../../contexts/useWallet';
import { useIdentity } from '../../contexts/useIdentity';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const wallet = useWallet()
  const navigate = useNavigate()
  const identity = useIdentity()

  if (!wallet.isInstallWallet() || !wallet.isConnected()) {
    navigate("/login")
  }

  useEffect(() => {
    fetchIdentity()
  }, [])

  const fetchIdentity = async () => {
    const identityDetail = await identity.getIdentity({ address: wallet.address })

    if (identityDetail.status === "pending") {
      navigate("/login")
    }
  }

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
