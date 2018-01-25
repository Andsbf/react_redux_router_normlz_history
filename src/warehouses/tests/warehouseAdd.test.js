import React from 'react';
import  { warehouseAdd as WarehouseAdd } from '../warehouseAdd';
import { sampleSize, fixtures } from '../../lib'

import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router'

const warehouse = fixtures.warehouses

const match = {
  path: 'tenantName/Warehouses',
}


const emptyWarehouse = {
  name: null,
  deliveryRunAllocationMethod: 1,
  address: null,
  defaultPickupDeliveryRun: null
}

describe('WarehouseAdd', () => {
  const component = mount(
    <MemoryRouter>
      <WarehouseAdd
        warehouse={emptyWarehouse}
        match={match}
        onFetchWarehouseIfNeeded={()=>{}}
      />
    </MemoryRouter>
  );

  it('renders warehouse header', () => {
    expect(component.find('Header').length).toBe(1)
  });

  it('renders warehouse form', () => {
    expect(component.find('WarehouseForm').length).toBe(1)
  });
})
