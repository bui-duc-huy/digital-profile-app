// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { AuthContextProvider } from './contexts/useAuth';
import { WalletContextProvider } from './contexts/useWallet';
import { IdentityContextProvider } from './contexts/useIdentity';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthContextProvider>
      <WalletContextProvider>
        <IdentityContextProvider>
          <ThemeProvider>
            <ScrollToTop />
            <BaseOptionChartStyle />
            <Router />
          </ThemeProvider>
        </IdentityContextProvider>
      </WalletContextProvider>
    </AuthContextProvider>
  );
}
