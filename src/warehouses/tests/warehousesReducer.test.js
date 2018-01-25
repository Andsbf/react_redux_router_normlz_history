import warehousesReducer, { initState } from '../warehousesReducer'
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
} from '../warehousesActions'

import { deepFreeze, keyBy } from '../../lib'

describe('WarehousesReducer', () => {
  const reducer = (action) => {
    return warehousesReducer(deepFreeze(initState), action)
  }

  describe('Processing Actions' ,() => {
    it('WAREHOUSE_ADDRESS_SEARCHING set searching to true', () => {
      const newState = reducer({type: WAREHOUSE_ADDRESS_SEARCHING, subdomain: 'edit'})

      expect(newState.edit.addressSearching).toBe(true)
    });

    it('WAREHOUSES_ADDRESS_SEARCH_RESULT set searching to false and update the addresses', () => {
      const addresses = [ { id: 1, name: 'one' }, { id: 2, name: 'two'} ]
      const newState = reducer({
        type:  WAREHOUSES_ADDRESS_SEARCH_RESULT,
        address: addresses,
        subdomain: 'edit'
      })

      expect(newState.edit.addressSearching).toBe(false)
      expect(newState.edit.addressSearchResults).toEqual(keyBy(addresses, 'id'))
    });

    it('WAREHOUSE_ADDRESS_SEARCHING set searching to true', () => {
      const newState = reducer({type: WAREHOUSE_ADDRESS_SEARCHING, subdomain: 'add'})

      expect(newState.add.addressSearching).toBe(true)
    });

    it('WAREHOUSES_ADDRESS_SEARCH_RESULT set searching to false and update the addresses', () => {
      const addresses = [ { id: 1, name: 'one' }, { id: 2, name: 'two'} ]
      const newState = reducer({
        type:  WAREHOUSES_ADDRESS_SEARCH_RESULT,
        address: addresses,
        subdomain: 'add'
      })

      expect(newState.add.addressSearching).toBe(false)
      expect(newState.add.addressSearchResults).toEqual(keyBy(addresses, 'id'))
    });

    it('WAREHOUSE_UPDATE_SUCCESS resets the state', () => {
      const newState = reducer({ type:  WAREHOUSE_UPDATE_SUCCESS })

      expect(newState).toEqual(initState)
    });

    it('WAREHOUSE_UPDATE_FAIL add the errors to the warehouse edit domain', () => {
      const apiUpdateErrors = [
        {
          field: '/name',
          message: 'name error'
        },
        {
          field: '/address/id',
          message: 'address error'
        }
      ]
      const newState = reducer({ type:  WAREHOUSE_UPDATE_FAIL, errors: { messages: apiUpdateErrors } })

      expect(newState.edit.errors.name).toEqual('name error')
      expect(newState.edit.errors['address/id']).toEqual('address error')
    });

    it('WAREHOUSE_UPDATE_NETWORK_FAIL set persisting flag to false', () => {
      const newState = reducer({ type:  WAREHOUSE_UPDATE_NETWORK_FAIL })

      expect(newState.edit.isPersisting).toEqual(false)
    });

    it('WAREHOUSE_UPDATE_REQUEST set persisting flag to true', () => {
      const newState = reducer({ type:  WAREHOUSE_UPDATE_REQUEST })

      expect(newState.edit.isPersisting).toEqual(true)
    });

    it('WAREHOUSE_ADD_SUCCESS resets the state', () => {
      const newState = reducer({ type:  WAREHOUSE_ADD_SUCCESS })

      expect(newState).toEqual(initState)
    });

    it('WAREHOUSE_ADD_FAIL add the errors to the warehouse edit domain', () => {
      const apiAddErrors = [
        {
          field: '/name',
          message: 'name error'
        },
        {
          field: '/address/id',
          message: 'address error'
        }
      ]
      const newState = reducer({ type:  WAREHOUSE_ADD_FAIL, errors: { messages: apiAddErrors } })

      expect(newState.add.errors.name).toEqual('name error')
      expect(newState.add.errors['address/id']).toEqual('address error')
    });

    it('WAREHOUSE_ADD_NETWORK_FAIL set persisting flag to false', () => {
      const newState = reducer({ type:  WAREHOUSE_ADD_NETWORK_FAIL })

      expect(newState.add.isPersisting).toEqual(false)
    });

    it('WAREHOUSE_ADD_REQUEST set persisting flag to true', () => {
      const initState = {
        add : {
          isPersisting: false
        }
      }

      const newState = warehousesReducer(deepFreeze(initState), { type:  WAREHOUSE_ADD_REQUEST })

      expect(newState.add.isPersisting).toEqual(true)
    });
  })
})
