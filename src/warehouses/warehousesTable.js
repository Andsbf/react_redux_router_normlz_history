import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchWarehouses } from './warehousesActions'
import { values } from '../lib'
import { Loading, Icon } from '../sharedComponents'
import WarehouseTableRow from './warehouseTableRow'

const Header = () => (
  <div className="row justify-content-md-center">
    <div className="h1">Warehouses</div>
  </div>
)

export class WarehousesTable extends Component {
  componentDidMount() {
    const {
      warehouses,
      onFetchWarehouses
    } = this.props

    if(!warehouses || values(warehouses).length < 2) onFetchWarehouses()
  }

  render() {
    if (this.props.warehouses === null) return (
      <React.Fragment>
        <Header/>
        <Loading/>
      </React.Fragment>
    )

    const { match, warehouses } = this.props

    return (
      <React.Fragment>
        <Header/>
        <br/>
        <div className="row justify-content-md-center">
          <NavLink to={`${match.url}/add`}>
            <button type="button" className="btn btn-success">
              <Icon type="plus" color="white" />&nbsp; Add Warehouse
            </button>
          </NavLink>
        </div>
        <br/>
        <div className="row justify-content-md-center">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="w-25">Id</th>
                <th scope="col" className="w-50">Name</th>
                <th scope="col" className="w-25">Action</th>
              </tr>
            </thead>
            <tbody>
              { values(warehouses).map((warehouse) => (
                <WarehouseTableRow
                  id={warehouse.id}
                  key={warehouse.id}
                  name={warehouse.name}
                  tenantPath={match.url}
                />
              )) }
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

WarehousesTable.propTypes = {
  match: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  warehouses: state.entities.warehouses
})

const mapDispatchToProps = (dispatch) => ({
  onFetchWarehouses() { dispatch(fetchWarehouses()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(WarehousesTable)
