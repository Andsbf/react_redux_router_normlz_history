import React from 'react';
import ReactDOM from 'react-dom';
import  { WarehousesTable } from '../warehousesTable';
import createHistory from 'history/createBrowserHistory'
import { sampleSize, fixtures } from '../../lib'

import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router'

const warehouses = fixtures.warehouses

const match = {
  url: 'tenantName/Warehouses'
}

let apiCallCounter;

const mockApiCall = () => {
  apiCallCounter += 1
}

describe('WarehousesTables', () => {
  it('renders without crashing', () => {
    shallow(
      <MemoryRouter>
        <WarehousesTable
          warehouses={{}}
          match={match}
          onFetchWarehouses={mockApiCall}
        />
      </MemoryRouter>
    );
  });

  it('renders loading while fetching warehouses', () => {
    const component = mount(
      <MemoryRouter>
        <WarehousesTable
          warehouses={null}
          match={match}
          onFetchWarehouses={mockApiCall}
        />
      </MemoryRouter>
    );

    expect(component.find('Loading').length).toBe(1)
  });

  it('Calls the api to fetch warehouses', () => {
    apiCallCounter = 0

    mount(
      <MemoryRouter>
        <WarehousesTable
          warehouses={sampleSize(warehouses,1)}
          match={match}
          onFetchWarehouses={mockApiCall}
        />
      </MemoryRouter>

    );
    expect(apiCallCounter).toBe(1);
  });

  it('Do NOT Call the api to fetch warehouses when the table has +2 warehouses', () => {
    apiCallCounter = 0

    mount(
      <MemoryRouter>
        <WarehousesTable
          warehouses={sampleSize(warehouses,3)}
          match={match}
          onFetchWarehouses={mockApiCall}
        />
      </MemoryRouter>

    );
    expect(apiCallCounter).toBe(0);
  });

  it('render n rows', () => {
    apiCallCounter = 0

    const component =  mount(
      <MemoryRouter>
        <WarehousesTable
          warehouses={sampleSize(warehouses,4)}
          match={match}
          onFetchWarehouses={mockApiCall}
        />
      </MemoryRouter>

    );
    expect(component.find('warehouseTableRow').length).toBe(4)
  });
})
