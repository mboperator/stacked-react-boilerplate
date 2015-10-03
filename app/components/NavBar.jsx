import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class AppNav extends React.Component {
  static defaultProps = {
    menuItems: [
      {label: 'Home', path: '/home'},
      {label: 'About', path: '/about'},
    ],
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { menuItems } = this.props;
    return (
      <Navbar brand='Stacked Boilerplate.'>
        <Nav>
          {menuItems.map((item, i) => {
            return (
              <LinkContainer to={item.path}>
                <NavItem
                  key={item.path}
                  eventKey={i}
                >
                  {item.label}
                </NavItem>
              </LinkContainer>
            );
          })}
        </Nav>
      </Navbar>
    );
  }
}
