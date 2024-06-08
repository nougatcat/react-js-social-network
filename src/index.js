import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './index.css';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
); 

//? Ветка no_typescript не содержит файлов tsx. Это все уроки, кроме 92, 95 и 100+