import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';
import PatientProvider from 'pages/context/PatientContext';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
// reportWebVitals(console.log); app perfomance
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const queryClint = new QueryClient()

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/clinique">
        <QueryClientProvider client={queryClint}> <PatientProvider><App /></PatientProvider></QueryClientProvider>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
reportWebVitals();
