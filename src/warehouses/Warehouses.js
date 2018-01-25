import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import warehousesTable from './warehousesTable';
import warehouseEdit from './warehouseEdit';
import warehouseAdd from './warehouseAdd'

const Warehouses = ({ match }) => {
  return (
    <React.Fragment>
      <Route exact path={'/:tenant/Warehouses'} component={warehousesTable}/>
      <Route exact path={`${match.url}/add`} component={warehouseAdd}/>
      <Route path={`${match.url}/edit/:warehouseId`} component={warehouseEdit}/>
    </React.Fragment>
  );
}

Warehouses.propTypes = {
  match: PropTypes.object.isRequired
};

export default Warehouses;
