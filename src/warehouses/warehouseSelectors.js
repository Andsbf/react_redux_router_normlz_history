import { getPath } from '../lib'

export  const buildWarehouseById = (id, state) => {
  const warehouse = Object.assign({},getPath(state,`entities.warehouses[${id}]`))

  if (!warehouse) return;

  warehouse.address = getPath(state,`entities.addresses[${warehouse.address}]]`)

  if (!warehouse.address) return;

  if(warehouse.defaultPickupDeliveryRun) {
    warehouse.defaultPickupDeliveryRun = getPath(state,`entities.addresses[${warehouse.defaultPickupDeliveryRun}]]`)

    if (!warehouse.defaultPickupDeliveryRun) return;
  }

  warehouse.defaultDeliveryRun = getPath(state,`entities.addresses[${warehouse.defaultDeliveryRun}]]`)

  if (!warehouse.defaultDeliveryRun) return;

  return warehouse
 }
