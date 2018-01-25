import React from 'react';
import  WarehouseForm from '../WarehouseForm';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router'

const emptyWarehouse = {
  name: null,
  deliveryRunAllocationMethod: 1,
  address: null,
  defaultPickupDeliveryRun: null
}

describe('warehouseForm', () => {
  it('Show validation warning for name when a invalid name is typed', () => {
    const component = mount(<WarehouseForm warehouse={emptyWarehouse} />)


    const nameInput = component.find('input').at(0)

    //set a less than 1 character name
    nameInput.simulate('change', { target: { value: '' } })

    expect(component.find('input').at(0).hasClass('is-invalid')).toBe(true)
    expect(component.find('Input div .invalid-feedback').text()).toBe('Name must be between 1 and 128 characters.')

    //set a valid name
    nameInput.simulate('change', { target: { value: 'asd' } })

    expect(component.find("Input[placeholder='Enter name']").hasClass('is-invalid')).toBe(false)
    expect(component.find('Input div .invalid-feedback').exists()).toBe(false)

    nameInput.simulate('change', { target: { value: '*'.repeat(129) } })

    expect(component.find('input').at(0).hasClass('is-invalid')).toBe(true)
    expect(component.find('div .invalid-feedback').text()).toBe('Name must be between 1 and 128 characters.')
  });

  it('Show validations warning for address and pickupdeliveryrun if none is selected', () => {
    let submitCallCount = 0
    const component =  mount(<WarehouseForm warehouse={emptyWarehouse}  onSubmit={ () => ++submitCallCount }/>)

    const nameInput = component.find('input').at(0)
    nameInput.simulate('change', { target: { value: 'New Name' } })

    // simulate a submit withtout choosing a address
    component.find("button[type='submit']").simulate('submit')

    //expect validations errors to be visible
    expect(component.find("DropdownSearch[label='Address'] div").at(2).text()).toBe('Invalid option.')
    expect(component.find("DropdownSearch[label='Pickup Delivery Run'] div").at(2).text()).toBe('Invalid option.')

    // Doesnt submit the form
    expect(submitCallCount).toBe(0)
  });

  it('Submit the form if warehouse is valid', () => {
    let searchResult = [{ id: 1, value: 'fake address 1' }]
    let submitCallCount = 0

    const component =  mount(<WarehouseForm warehouse={emptyWarehouse} addresses={searchResult} onSubmit={ () => ++submitCallCount }/>)

    const nameInput = component.find('input').at(0)
    nameInput.simulate('change', { target: { value: 'New Name' } })

    // simulate a address selection
    // open dropdown
    component.find("DropdownSearch[label='Address'] button").simulate('click')
    // select option
    component.find("DropdownSearch[label='Address'] a.dropdown-item").simulate('click')

    // simulate a pickupDelivery selection
    // open dropdown
    component.find("DropdownSearch[label='Pickup Delivery Run'] button").simulate('click')
    // select option
    component.find("DropdownSearch[label='Pickup Delivery Run'] a.dropdown-item").simulate('click')

    //submit form
    component.find("button[type='submit']").simulate('submit')

    expect(submitCallCount).toBe(1)
  });
})
