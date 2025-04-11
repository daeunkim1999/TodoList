import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import TodoList from './components/TodoList';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f0f2f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'flex-start',
        bgcolor: 'background.default'
      }}>
        <TodoList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
