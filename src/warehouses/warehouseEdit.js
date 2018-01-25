import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Loading } from '../sharedComponents'
import  WarehouseForm from './warehouseForm'
import  WarehouseHeader from './warehouseHeader'
import { buildWarehouseById } from './warehouseSelectors'
import {
  warehouseAddressSearch,
  fetchWarehouseIfNeeded,
  updateWarehouse
} from './warehousesActions'



export class warehouseEdit extends Component {
  componentDidMount() {
    const warehouseId = this.props.match.params.warehouseId

    this.props.onFetchWarehouseIfNeeded(warehouseId)
  }

  render() {
    const tenantWarehousesPath = this.props.match.path.split('/').slice(1,3).join('/')

    const {
      onAddressSearching,
      isSearchingAddress,
      addresses,
      isPersisting,
      onSubmitUpdate,
      warehouse,
      errors
    } = this.props

    return (
      <React.Fragment>
        <WarehouseHeader tenantWarehousesPath={tenantWarehousesPath} title="Edit Warehouse"/>
        <br/>
        { !warehouse ?
          <Loading /> :
          <WarehouseForm
            onAddressSearching={onAddressSearching}
            isSearchingAddress={isSearchingAddress}
            addresses={addresses}
            warehouse={warehouse}
            onSubmit={onSubmitUpdate}
            isPersisting={isPersisting}
            serverErrors={errors}
          />
        }
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

  const warehouse = buildWarehouseById(ownProps.match.params.warehouseId, state)

  return {
    warehouse: warehouse,
    isSearchingAddress: state.warehouses.edit.addressSearching,
    addresses: state.warehouses.edit.addressSearchResults,
    isPersisting: state.warehouses.edit.isPersisting,
    errors: state.warehouses.edit.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    onFetchWarehouseIfNeeded(id) { dispatch(fetchWarehouseIfNeeded(id)) },
    onAddressSearching(value) { dispatch(warehouseAddressSearch(value, 'edit')) },
    onSubmitUpdate(warehouse) { dispatch(updateWarehouse(warehouse)) },
  })
}

warehouseEdit.propTypes = {
  match: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(warehouseEdit);
