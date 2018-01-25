import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import configStore from '../configStore';
import createHistory from 'history/createBrowserHistory'
import { shallow } from 'enzyme';

const history = createHistory();
const store = configStore(history);

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<Root store={store} history={history}/>, div);
});
