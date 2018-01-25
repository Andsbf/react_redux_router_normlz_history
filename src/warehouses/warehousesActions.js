import { push } from 'react-router-redux'
import  warehousesApi  from '../lib/api/warehouses'
import { getPath } from '../lib'
import { networkError } from '../sharedComponents/actions'

export const WAREHOUSE_EDIT_ENTITY = 'WAREHOUSE_EDIT_ENTITY'
export const editWarehouse = warehouse => ({
  type: WAREHOUSE_EDIT_ENTITY,
  warehouse
})

export const WAREHOUSE_FETCHED = 'WAREHOUSE_FETCHED'
export const warehouseFetched = data => ({
  type: WAREHOUSE_FETCHED,
  data
})

export const WAREHOUSES_FETCHED = 'WAREHOUSES_FETCHED'
export const warehousesFetched = data => ({
  type: WAREHOUSES_FETCHED,
  data
})

export const WAREHOUSES_ADDRESS_SEARCH_RESULT = 'WAREHOUSES_ADDRESS_SEARCH_RESULT'
export const warehousesAddressSearchResult = (address, subdomain)  => ({
  type: WAREHOUSES_ADDRESS_SEARCH_RESULT,
  subdomain,
  address
})

export const WAREHOUSE_ADDRESS_SEARCHING = 'WAREHOUSE_ADDRESS_SEARCHING'
export const warehouseAddressSearching = (subdomain) => ({
  type: WAREHOUSE_ADDRESS_SEARCHING,
  subdomain
})

export const WAREHOUSE_UPDATE_REQUEST = 'WAREHOUSE_UPDATE_REQUEST'
export const warehouseUpdateRequest = () => ({
  type: WAREHOUSE_UPDATE_REQUEST
})

export const WAREHOUSE_UPDATE_SUCCESS = 'WAREHOUSE_UPDATE_SUCCESS'
export const warehouseUpdateSuccess = (data) => ({
  type: WAREHOUSE_UPDATE_SUCCESS,
  data
})

export const WAREHOUSE_UPDATE_FAIL = 'WAREHOUSE_UPDATE_FAIL'
export const warehouseUpdateFail = (errors) => ({
  type: WAREHOUSE_UPDATE_FAIL,
  errors
})
export const WAREHOUSE_UPDATE_NETWORK_FAIL = 'WAREHOUSE_UPDATE_NETWORK_FAIL'
export const warehouseUpdateNetworkFail = (errors) => ({
  type: WAREHOUSE_UPDATE_NETWORK_FAIL,
  errors
})

export const WAREHOUSE_ADD_REQUEST = 'WAREHOUSE_ADD_REQUEST'
export const warehouseAddRequest = () => ({
  type: WAREHOUSE_ADD_REQUEST
})

export const WAREHOUSE_ADD_SUCCESS = 'WAREHOUSE_ADD_SUCCESS'
export const warehouseAddSuccess = (data) => ({
  type: WAREHOUSE_ADD_SUCCESS,
  data
})

export const WAREHOUSE_ADD_FAIL = 'WAREHOUSE_ADD_FAIL'
export const warehouseAddFail = (errors) => ({
  type: WAREHOUSE_ADD_FAIL,
  errors
})

export const WAREHOUSE_ADD_NETWORK_FAIL = 'WAREHOUSE_ADD_NETWORK_FAIL'
export const warehouseAddNetworkFail = (errors) => ({
  type: WAREHOUSE_ADD_NETWORK_FAIL,
  errors
})

const timeout = 500
export const warehouseAddressSearch = (value, subdomain) => dispatch => {
  let searchResult = [
    {id: 1, value: 'fake address 1'},
    {id: 2, value: 'fake address 2'}
  ]

  if (value === 'error') searchResult = []

  dispatch(warehouseAddressSearching(subdomain))

  setTimeout(
    () => {
      dispatch(warehousesAddressSearchResult(searchResult, subdomain))
    }
  ,timeout)
}

const formatWarehouseToApi = (warehouse) => ({
  "id": warehouse.id,
	"name": warehouse.name,
	"deliveryRunAllocationMethod": warehouse.deliveryRunAllocationMethod,
	"defaultDeliveryRun": {"id": getPath(warehouse, 'defaultDeliveryRun.id')},
	"defaultPickupDeliveryRun": {"id": getPath(warehouse, 'defaultPickupDeliveryRun.id')},
	"address": {"id": getPath(warehouse ,'address.id')}
})

export const updateWarehouse = (warehouse) => (dispatch, getState) => {
  const { tenantName } = getState().app.user;

  dispatch(warehouseUpdateRequest())

  warehousesApi
    .update(formatWarehouseToApi(warehouse))
    .then( response => {
      if (!response.ok) {
        if (response.error.type === 'NetworkError') {
          dispatch(networkError())
          dispatch(warehouseUpdateNetworkFail())
          return
        }
        dispatch(warehouseUpdateFail(response.error))
        return
      }
      dispatch(warehouseUpdateSuccess(response.data))
      dispatch(push(`/${tenantName}/Warehouses`))
    })

}

export const addWarehouse = (warehouse) => (dispatch, getState) => {
  const { tenantName } = getState().app.user;

  dispatch(warehouseAddRequest())

  warehousesApi
    .add(formatWarehouseToApi(warehouse))
    .then( response => {
      if (!response.ok) {
        if (response.error.type === 'NetworkError') {
          dispatch(networkError())
          dispatch(warehouseAddNetworkFail())
          return
        }

        dispatch(warehouseAddFail(response.error))
        return
      }


      dispatch(warehouseAddSuccess(response.data))
      dispatch(push(`/${tenantName}/Warehouses`))
    })
}

export const fetchWarehouses = () => (dispatch, getState) => {
  warehousesApi
    .fetchAll()
    .then( response => {
      if (!response.ok) {
        return response.error.type === 'NetworkError' && dispatch(networkError())
      }

      dispatch(warehousesFetched(response.data))
    })
}

export const fetchWarehouse = (id) => (dispatch, getState) => {
  warehousesApi
    .fetchById(id)
    .then( response => {
      if (response.ok)  dispatch(warehouseFetched(response.data))
    })
}

const shouldFetchWarehouse = (state, warehouseId) => {
  if (!state.entities) {
    return true
  }
  const warehouse = state.entities[warehouseId]

  if (!warehouse) {
    return true
  }

  const warehouseHasAllFields = (
    ['name', 'deliveryRunAllocate', 'address', 'pickupDeliveryRun'].every(property => property in warehouse)
  )

  return !warehouseHasAllFields
}

export const fetchWarehouseIfNeeded = warehouseId => (dispatch, getState) => {
  if (shouldFetchWarehouse(getState(), warehouseId)) {
    return dispatch(fetchWarehouse(warehouseId))
  }
}
