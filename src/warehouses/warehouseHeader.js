import React from 'react'
import { NavLink } from 'react-router-dom';
import { Icon } from '../sharedComponents'

const style = {
  navLink: {
    color: 'white'
  }
}

const Header = ({tenantWarehousesPath, title, }) => (
  <div>
    <div className="row justify-content-md-center">
      <div className="h1">{title}</div>
    </div>
    <br/>
    <div className="row justify-content-md-center">
      <NavLink style={style.navLink} to={'/' + tenantWarehousesPath}>
        <button type="button" className="btn btn-success">
          <Icon type="arrow-left" color="white"/> &nbsp; Back to Warehouses
        </button>
      </NavLink>
    </div>
  </div>
)

export default Header;
