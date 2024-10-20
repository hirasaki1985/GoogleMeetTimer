import './global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
// import { createRoot } from 'react-dom/client';

const appContainer = document.createElement('div');
appContainer.id = 'my-extension-root';
document.body.appendChild(appContainer);

ReactDOM.render(<App />, document.getElementById('my-extension-root'));
/*
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
*/
