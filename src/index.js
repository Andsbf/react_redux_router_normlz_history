import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Root from './root';
import configStore from './configStore';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
export const store = configStore(history);

const rootElement = document.getElementById('root')

render(
  <Root store={store} history={history} {...rootElement.dataset}/>,
  rootElement
)
registerServiceWorker();
