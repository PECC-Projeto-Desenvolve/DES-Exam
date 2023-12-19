import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/routes';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { FontSizeProvider } from './context/FontSize';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <FontSizeProvider>
          <AppRoutes />
        </FontSizeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
