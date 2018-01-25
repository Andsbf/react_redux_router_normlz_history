import React from 'react';
import  WarehouseTableRow from '../WarehouseTableRow';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router'

describe('WarehouseTableRows', () => {
  it('renders without crashing', () => {
    shallow(
      <MemoryRouter>
        <WarehouseTableRow />
      </MemoryRouter>
    );
  });

  const props = {
      id: 1,
      name: 'joe',
      tenantPath: 'tenant/Path'
    }

    const component =  mount(
      <MemoryRouter>
        <table>
          <tbody>
            <WarehouseTableRow {...props} />
          </tbody>
        </table>
      </MemoryRouter>
    )

  it('renders id in the correct column', () => {
    expect(component.find('th').text()).toBe(props.id.toString())
  });

  it('renders name in the correct column', () => {
    expect(component.find('td').at(0).text()).toBe(props.name)
  });

  it('renders a link to edit page', () => {
    const thirdColum = component.find('td').at(1)

    expect(thirdColum.find('a').prop('href')).toBe(`${props.tenantPath}/edit/${props.id}`)
  });
})
