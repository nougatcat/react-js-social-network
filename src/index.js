import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './index.css';
import store from './redux/redux-store.ts';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
); 

//? Ветка master - typescript and ant design
//? Ветка no_antd - typescript
//? Ветка no_typescript - javascript