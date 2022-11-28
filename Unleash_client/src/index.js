import React from 'react';
import ReactDOM from 'react-dom/client';
import './resources/css/index.css'
import App from './App';
import {Buffer} from 'buffer';
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


