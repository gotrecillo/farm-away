import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import './index.css';

import 'sweetalert2/dist/sweetalert2.min.css'
import App from './App';
import gameReducer from './gameSlice'

import reportWebVitals from './reportWebVitals';

const store = configureStore({
    reducer: {
        game: gameReducer,
    },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
