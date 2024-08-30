import { useContext } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { ThemeProvider as ThemeContextProvider, ThemeContext } from './theme/ThemeContext'; 
import createBaselightTheme from './theme/DefaultColors';

function App() {
  const themeColors = useContext(ThemeContext);

  if (!themeColors) {
      console.error("Theme colors are not defined");
      return null; // Or a loading indicator
  }

  const theme = createBaselightTheme(themeColors); // Create theme with context colors

  const routing = useRoutes(Router);

  return (
      <ThemeContextProvider>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              {routing}
          </ThemeProvider>
      </ThemeContextProvider>
  );
}

export default App;
