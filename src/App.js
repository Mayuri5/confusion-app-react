import React from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/reducer';
import { Provider } from 'react-redux';
const store = ConfigureStore();

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );

}

export default App;
