import { keyBy } from '../lib'

import {
  WAREHOUSE_ADDRESS_SEARCHING,
  WAREHOUSES_ADDRESS_SEARCH_RESULT,
  WAREHOUSE_UPDATE_REQUEST,
  WAREHOUSE_UPDATE_SUCCESS,
  WAREHOUSE_UPDATE_FAIL,
  WAREHOUSE_UPDATE_NETWORK_FAIL,
  WAREHOUSE_ADD_REQUEST,
  WAREHOUSE_ADD_SUCCESS,
  WAREHOUSE_ADD_FAIL,
  WAREHOUSE_ADD_NETWORK_FAIL
} from './warehousesActions'

export const initState = {
  edit: {
    addressSearching: false,
    addressSearchResults: null,
    entity: null,
    isPersisting: false,
    errors: null
  },
  add: {
    addressSearching: false,
    addressSearchResults: null,
    isPersisting: false,
    entity: null
  }
};

const warehousesReducer = (state = initState, action) => {
  switch (action.type) {
    case WAREHOUSE_ADDRESS_SEARCHING:
      return {
        ...state,
        [action.subdomain]:{
          ...state.edit,
          addressSearching: true
        }
      };

    case WAREHOUSES_ADDRESS_SEARCH_RESULT:
      const addresses = keyBy(action.address, 'id')
      return {
        ...state,
        [action.subdomain]:{
          ...state.edit,
          addressSearchResults: addresses,
          addressSearching: false
        }
      };

    case WAREHOUSE_UPDATE_SUCCESS:
      return {
        ...state,
        edit: {...initState.edit}
      }

    case WAREHOUSE_UPDATE_FAIL:
      let updateErrors = {}

      action.errors.messages.forEach(error =>(
        updateErrors[error.field.substring(1)] = error.message
      ))

      return {
        ...state,
        edit: {
          ...initState.edit,
          errors: {
            ...updateErrors
          }
        }
      }

    case WAREHOUSE_UPDATE_NETWORK_FAIL:
      return {
        ...state,
        edit: {
          ...state.edit,
          isPersisting: false
        }}

    case WAREHOUSE_UPDATE_REQUEST:
      return {
        ...state,
        edit:{
          ...state.edit,
          isPersisting: true
        }
      };

    case WAREHOUSE_ADD_SUCCESS:
      return {
        ...state,
        add: {...initState.add}
      }

    case WAREHOUSE_ADD_FAIL:
      let addErrors = {}

      action.errors.messages.map(error => addErrors[error.field.substring(1)] = error.message)

      return {
        ...state,
        add: {
          ...initState.add,
          errors: {
            ...addErrors
          }
        }
      }

    case WAREHOUSE_ADD_NETWORK_FAIL:
      return {
        ...state,
        add: {
          ...state.add,
          isPersisting: false
        }
      }

    case WAREHOUSE_ADD_REQUEST:
      return {
        ...state,
        add:{
          ...state.add,
          isPersisting: true
        }
      };

    default:
    return state;
  }
};

export default warehousesReducer;
