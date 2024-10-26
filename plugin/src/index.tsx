import React from 'react';
import { App } from './App';
import { createRoot } from 'react-dom/client';

const appContainer = document.createElement('div');
appContainer.id = 'my-extension-root';
document.body.appendChild(appContainer);

const root = createRoot(document.getElementById('root')!).render(<App />);
