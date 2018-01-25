import {
  WAREHOUSES_FETCHED,
  WAREHOUSE_FETCHED,
  WAREHOUSE_UPDATE_SUCCESS,
  WAREHOUSE_ADD_SUCCESS
} from '../../warehouses/warehousesActions'

import { keyBy, values } from '../../lib'

const entities = (state = { warehouses: null, addresses: null }, action) => {
  switch (action.type) {
    case WAREHOUSES_FETCHED:
      const warehouses = keyBy(action.data.warehouses, 'id')
      const addresses =  keyBy(action.data.addresses, 'id')

      return {
        ...state,
        warehouses: { ...warehouses },
        addresses: { ...addresses }
      };

    case WAREHOUSE_FETCHED:
      const warehouse = values(action.data.warehouses)[0]
      const warehouseAddresses =  keyBy(action.data.addresses, 'id')

      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          [warehouse.id]: { ...warehouse }
        },
        addresses: {
          ...state.addresses,
          ...warehouseAddresses
        }
      };
    case WAREHOUSE_UPDATE_SUCCESS:
      const warehouseUpdated = values(action.data.warehouses)[0]
      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          [warehouseUpdated.id]: { ...warehouseUpdated }
        }
      }

    case WAREHOUSE_ADD_SUCCESS:
      const warehouseAdded = values(action.data.warehouses)[0]
      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          [warehouseAdded.id]: { ...warehouseAdded }
        }
      }

    default:
      return state
  }
}

export default entities
