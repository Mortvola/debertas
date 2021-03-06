import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import MobxStore from './state/mobxStore';
import { Views } from './state/State';

const Menubar = () => {
  const { uiState, user: { username } } = useContext(MobxStore);

  const handleSelect = (eventKey: Views | string | null) => {
    if (eventKey) {
      uiState.setView(eventKey as Views);
    }
  };

  return (
    <Navbar collapseOnSelect onSelect={handleSelect} expand="md">
      <Navbar.Brand href="/">Deber-tas</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link eventKey="HOME">Home</Nav.Link>
          <Nav.Link eventKey="PLANS">Plans</Nav.Link>
          <Nav.Link eventKey="ACCOUNTS">Accounts</Nav.Link>
          <Nav.Link eventKey="REPORTS">Reports</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown className="dropdown menubar-item" title={username || ''} id="menubar-dropdown">
            <Nav.Link eventKey="ACCOUNT">Account</Nav.Link>
            <Nav.Link eventKey="LOGOUT">Logout</Nav.Link>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default observer(Menubar);
