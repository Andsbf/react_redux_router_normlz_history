import React from 'react';
import { Icon } from '../sharedComponents'
import { NavLink } from 'react-router-dom'

const warehouseTableRow = ({id, name, tenantPath}) => (
  <tr>
    <th scope="row">{id}</th>
    <td>{name}</td>
    <td>
      <NavLink to={`${tenantPath}/edit/${id}`}>
        <Icon type="pencil" color="#007bff" />&nbsp;Edit
      </NavLink>
    </td>
  </tr>
)

export default warehouseTableRow
