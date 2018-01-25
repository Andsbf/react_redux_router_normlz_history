import {
  isEmpty,
  pick
} from '../lib'

const errorsMessage = {
  name: 'Name must be between 1 and 128 characters.',
  presence: 'Must be present.'
}

const validateName = (value, error) => {
  if (!value || value.length === 0 || value.length > 128)  {
   return pick(errorsMessage, 'name')
  }
}

const warehouseFormValidator = {
  field (fieldName, fieldValue) {
    let error = null

    switch (fieldName) {
      case 'name':
       error =  validateName(fieldValue)
        break;

      default:
        return error
    }

    return error;
  },

  entity (warehouse) {
    let error = {}

    if (!warehouse.name || warehouse.name.length === 0 || warehouse.name.length > 128)  {
        error.name = errorsMessage.name
    }

    if (isEmpty(warehouse.address)) {
      error.address = errorsMessage.presence
    }

    if (isEmpty(warehouse.defaultPickupDeliveryRun)) {
      error.defaultPickupDeliveryRun = errorsMessage.presence
    }

    if (warehouse.deliveryRunAllocationMethod === 2 &&  isEmpty(warehouse.defaultDeliveryRun)) {
      error.defaultDeliveryRun =  errorsMessage.presence
    }

    return error
  }
}

export default warehouseFormValidator;
