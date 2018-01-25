import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import  WarehouseForm from './warehouseForm'
import  WarehouseHeader from './warehouseHeader'
import {
  warehouseAddressSearch,
  fetchWarehouseIfNeeded,
  addWarehouse
} from './warehousesActions'

export class warehouseAdd extends Component {
  render() {
    const tenantWarehousesPath = this.props.match.path.split('/').slice(1,3).join('/')

    const {
      onAddressSearching,
      isSearchingAddress,
      onSubmitAdd,
      addresses,
      warehouse,
      errors,
      isPersisting
    } = this.props

    return (
      <React.Fragment>
        <WarehouseHeader tenantWarehousesPath={tenantWarehousesPath} title="Add Warehouse"/>
        <br/>
          <WarehouseForm
            onAddressSearching={onAddressSearching}
            isSearchingAddress={isSearchingAddress}
            addresses={addresses}
            warehouse={warehouse}
            serverErrors={errors}
            isPersisting={isPersisting}
            onSubmit={onSubmitAdd}
          />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const emptyWarehouse = {
    name: null,
    deliveryRunAllocationMethod: 1,
    address: null,
    defaultPickupDeliveryRun: null
  }

  return {
    warehouse: emptyWarehouse,
    isSearchingAddress: state.warehouses.add.addressSearching,
    addresses: state.warehouses.add.addressSearchResults,
    isPersisting: state.warehouses.add.isPersisting,
    errors: state.warehouses.add.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    onFetchWarehouseIfNeeded(id) { dispatch(fetchWarehouseIfNeeded(id)) },
    onAddressSearching(value) { dispatch(warehouseAddressSearch(value, 'add')) },
    onSubmitAdd(warehouse) { dispatch(addWarehouse(warehouse)) },
  })
}

warehouseAdd.propTypes = {
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(warehouseAdd);
