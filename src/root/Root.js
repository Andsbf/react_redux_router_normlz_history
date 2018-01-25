import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { Toaster } from '../sharedComponents'
import { rootActions } from '../root'
import Warehouses from '../warehouses';
import { ConnectedRouter } from 'react-router-redux'

const Root = (props) => {
  const { store, history, authToken} = props

  // Dispatch action to populate User info from Html tag
  rootActions.updateUserInfo(
    store.dispatch,
    authToken,
    history.location.pathname.split( '/' )[1]
  )

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="container">
          <Switch>
            <Route path='/:tenant/Warehouses' component={Warehouses} />
            <Redirect from='*' to={'/'} />
          </Switch>
          <Toaster/>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
