import React from 'react';
import  { warehouseEdit as WarehouseEdit } from '../warehouseEdit';
import { sampleSize, fixtures } from '../../lib'

import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router'

const warehouse = fixtures.warehouses

const match = {
  path: 'tenantName/Warehouses',
  params: { warehouseId: 1 }
}

let apiCallCounter;

const mockApiCall = () => {
  apiCallCounter += 1
}

describe('WarehouseEdit', () => {
  it('renders without crashing', () => {
    shallow(
      <MemoryRouter>
        <WarehouseEdit
          warehouse={null}
          match={match}
          onFetchWarehouseIfNeeded={()=>{}}
        />
      </MemoryRouter>
    );
  });

  apiCallCounter = 0

  const component = mount(
    <MemoryRouter>
      <WarehouseEdit
        warehouse={null}
        match={match}
        onFetchWarehouseIfNeeded={mockApiCall}
      />
    </MemoryRouter>
  );

  it('On Component Mount call action to fetch warehouse if needed ', () => {
    expect(apiCallCounter).toBe(1)
  });

  it('renders warehouse Header', () => {
    expect(component.find('Header').length).toBe(1)
  });

  it('renders Loading while fetching warehouse', () => {
    expect(component.find('Loading').length).toBe(1)
  });

  it('renders form when warehouse is present', () => {
    const component = mount(
      <MemoryRouter>
        <WarehouseEdit
          warehouse={fixtures.warehouse}
          match={match}
          onFetchWarehouseIfNeeded={mockApiCall}
        />
      </MemoryRouter>
    );
    expect(component.find('WarehouseForm').length).toBe(1)
  });
})
