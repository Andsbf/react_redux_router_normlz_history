import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  values,
  omit,
  getPath,
  isEmpty,
} from '../lib'
import {
  Loading,
  DropdownSearch,
  RadioInput,
  Input
} from '../sharedComponents'
import warehouseFormValidator from './warehouseFormValidator'

class WarehouseForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      name: null,
      deliveryRunAllocationMethod: null,
      address: null,
      defaultPickupDeliveryRun: null,
      defaultDeliveryRun: null,
      errors: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { serverErrors } = nextProps

    if (serverErrors) {
      let newErrors = {}

      //Errors from server come with '/'s as padding to
      Object.keys(serverErrors).forEach( errorKey => newErrors[errorKey.split('/')[0]] = serverErrors[errorKey])

      this.setState({ errors: newErrors })
    }
  }

  handleSubmit(event, updatedWarehouse) {
    event.preventDefault();

    const { onSubmit, warehouse} = this.props

    const errors = warehouseFormValidator.entity(updatedWarehouse)

    if (!isEmpty(errors)) return this.setState({ errors: errors })

    onSubmit({ id: warehouse.id, ...updatedWarehouse })
  }

  validate(field, value) {
    const error = warehouseFormValidator.field(field, value)

    if (error) this.setState({errors: {...this.state.errors, ...error}})
  }

  handleFieldChange(field, value) {
    let affectedFields = []

    // Map the affected fields so we can also clean the error for them
    if (field === 'deliveryRunAllocationMethod') affectedFields.push('defaultDeliveryRun')

    this.setState({
      [field]: value,
      errors: { ...omit(this.state.errors, [field, ...affectedFields]) }
    })

    this.validate(field, value)
  }

  fieldErrorCheck(field) {
    if (this.props.isPersisting) return false

    return getPath(this.state.errors, field)
  }

  render() {
    const {
      onAddressSearching,
      isSearchingAddress,
      addresses,
      warehouse,
      disabled,
      isPersisting
    } = this.props

    const {
      name,
      address,
      deliveryRunAllocationMethod,
      defaultPickupDeliveryRun,
      defaultDeliveryRun,
      errors
    } = this.state

    const warehouseInProgress =  {
      id: warehouse.id,
      name: name !== null ? name : ( warehouse.name || ''),
      deliveryRunAllocationMethod: deliveryRunAllocationMethod || warehouse.deliveryRunAllocationMethod,
      address: address || warehouse.address || {},
      defaultPickupDeliveryRun: defaultPickupDeliveryRun || warehouse.defaultPickupDeliveryRun,
      defaultDeliveryRun: defaultDeliveryRun || warehouse.defaultDeliveryRun,
    }

    const addressesAsOption = addresses && values(addresses).map(address => ({key: address.id, value: address.value}))

    const isFormDirty = values(this.state).some((newProperty) => newProperty !== null)

    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6 card">
          <div className="card-body">
            <form onSubmit={(e) => this.handleSubmit(e, warehouseInProgress)}>
              <div className="form-group">
                <label>Name</label>
                <Input
                  placeholder="Enter name"
                  value={warehouseInProgress.name}
                  onChange={(e) => this.handleFieldChange('name', e.target.value)}
                  disabled={disabled || isPersisting}

                />
              </div>
              <label>Delivery Run Allocate Options</label>
              <RadioInput
                label="Use postcode / suburb to allocate delivery"
                value="1"
                checked={warehouseInProgress.deliveryRunAllocationMethod === 1}
                onChange={() => this.handleFieldChange('deliveryRunAllocationMethod', 1)}
                disabled={disabled || isPersisting}
              />
              <RadioInput
                label="Use default Delivery Run"
                value="2"
                checked={warehouseInProgress.deliveryRunAllocationMethod === 2}
                onChange={() => this.handleFieldChange('deliveryRunAllocationMethod', 2)}
                disabled={disabled || isPersisting}
              />
              { warehouseInProgress.deliveryRunAllocationMethod === 2 &&
                <DropdownSearch
                  placeholder="Search for a Delivery Run"
                  label="Default Delivery Run"
                  options={addressesAsOption}
                  onSelection={(option) => this.handleFieldChange('defaultDeliveryRun',{ id: option.key, value: option.value })}
                  onSearch={onAddressSearching}
                  isSearching={isSearchingAddress}
                  selected={getPath(warehouseInProgress, 'defaultDeliveryRun.name')}
                  disabled={disabled || isPersisting}
                  invalid={errors && errors.defaultDeliveryRun}
                />
              }
              <DropdownSearch
                placeholder="Select an Address"
                label="Address"
                options={addressesAsOption}
                onSelection={(option) => this.handleFieldChange('address',{ id: option.key, value: option.value })}
                onSearch={onAddressSearching}
                isSearching={isSearchingAddress}
                selected={warehouseInProgress.address.name}
                disabled={disabled || isPersisting}
                invalid={errors && errors.address}
              />
              <DropdownSearch
                placeholder="Select delivery"
                label="Pickup Delivery Run"
                options={addressesAsOption}
                onSelection={(option) => this.handleFieldChange('defaultPickupDeliveryRun',{ id: option.key, value: option.value })}
                onSearch={onAddressSearching}
                isSearching={isSearchingAddress}
                selected={getPath(warehouseInProgress, 'defaultPickupDeliveryRun.name')}
                disabled={disabled || isPersisting}
                invalid={errors && errors.defaultPickupDeliveryRun}
              />
              <div className="text-center">
                <button
                  style={{width: 80, height: 40}}
                  type="submit"
                  className="btn btn-primary"
                  disabled={disabled || values(errors).length || isPersisting || !isFormDirty}
                >
                  { isPersisting ? <Loading color="white" width="30" margin="0"/> : 'save' }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

WarehouseForm.propTypes = {
  match: PropTypes.object
};

export default WarehouseForm
