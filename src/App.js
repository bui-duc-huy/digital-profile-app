// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { AuthContextProvider } from './contexts/useAuth';
import { WalletContextProvider } from './contexts/useWallet';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthContextProvider>
      <WalletContextProvider>
        <ThemeProvider>
          <ScrollToTop />
          <BaseOptionChartStyle />
          <Router />
        </ThemeProvider>
      </WalletContextProvider>
    </AuthContextProvider>
  );
}
