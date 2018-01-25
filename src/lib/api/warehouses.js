import  { HttpJSON } from '../http'
import { normalize, schema } from '../index';
import { store } from '../../index'

const addresses = new schema.Entity('addresses');

const warehousesSchema = new schema.Entity('warehouses', {
  address: addresses,
  defaultPickupDeliveryRun: addresses,
  defaultDeliveryRun: addresses
});

const warehousePath = '/Warehouses'

export default  {
  fetchAll() {
    const { token, tenantName } = store.getState().app.user

    return HttpJSON
      .GET(`/${tenantName}${warehousePath}`, { accessToken: token })
      .then( res => {
        return new Promise((resolve) => {
          if (res.ok)  {
            res.data =  normalize(res.data, new schema.Array(warehousesSchema)).entities
          }
          resolve(res)
        })
      })
  },

  fetchById(id) {
    const { token, tenantName } = store.getState().app.user

    return HttpJSON
      .GET(`/${tenantName}${warehousePath}/${id}`, { accessToken:token })
      .then( res => {
        return new Promise((resolve) => {
          if (res.ok)  {
            res.data =  normalize(res.data, warehousesSchema).entities
          }

          resolve(res)
        })
      })
  },

  update(warehouse) {
    const { token, tenantName } = store.getState().app.user

    return HttpJSON
      .PUT(`/${tenantName}${warehousePath}/${warehouse.id}`, warehouse, { accessToken:token })
      .then( res => {
        return new Promise((resolve) => {
          if (res.ok)  {
            res.data =  normalize(res.data, warehousesSchema).entities
          }

          resolve(res)
        })
      })
  },

  add(warehouse) {
    const { token, tenantName } = store.getState().app.user

    return HttpJSON
      .POST(`/${tenantName}${warehousePath}`, warehouse, { accessToken:token })
      .then( res => {
        return new Promise((resolve) => {
          if (res.ok)  {
            res.data =  normalize(res.data, warehousesSchema).entities
          }

          resolve(res)
        })
      })
  },
};
