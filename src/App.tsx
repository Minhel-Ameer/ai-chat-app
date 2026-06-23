import { ThemeProvider } from '@emotion/react';
import ChatScreen from './pages/ChatScreen';
import { useChatStore } from './storage/store';
import { getTheme } from './theme/theme';
import { CssBaseline } from '@mui/material';
import ErrorSnackbar from './ui/SnackBar';

function App() {

  const themeMode = useChatStore((s) => s.theme)
  const theme = getTheme(themeMode)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ErrorSnackbar />
      <ChatScreen />
    </ThemeProvider>
  );
}

export default App