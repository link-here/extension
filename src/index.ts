import React from 'react';
import ReactDOM from 'react-dom';
import normalizeWindow from './lib/normalize-window';
import App from './components/app';

normalizeWindow();

ReactDOM.render(React.createElement(App), document.querySelector('#react-container'));
