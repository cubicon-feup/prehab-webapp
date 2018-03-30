import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router'

class menu extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <Menu>
        <div className="menu-item">
            <Link to={'/home'}> Home Page</Link>
        </div>
        <div className="menu-item">
            <Link to={'/login'}> Login Page</Link>
        </div>

      </Menu>
    );
  }
}
export default menu;
