import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/routes';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { FontSizeProvider } from './context/FontSize';
import { TimerProvider } from './context/TimerContext';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FontSizeProvider>
          <TimerProvider>
            <AppRoutes />
          </TimerProvider>
        </FontSizeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
