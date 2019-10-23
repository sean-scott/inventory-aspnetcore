import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PrimaryButton, Modal, DefaultButton } from 'office-ui-fabric-react';
import './NavMenu.css';
import AddEditItem from './AddEditItem';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      collapsed: true,
      showModal: false
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  showModal () {
    this.setState({
      showModal: true
    });
  }

  closeModal () {
    this.setState({
      showModal: false
    })
  }

  render () {
    return (
      <div>
        <header>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
            <Container>
              <NavbarBrand tag={Link} to="/">Inventory</NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                  {/* <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                  </NavItem> */}
                  <PrimaryButton text="Add Item" onClick={this.showModal} style={{marginTop: '4px'}} />
                </ul>
              </Collapse>
            </Container>
          </Navbar>
        </header>
        <AddEditItem 
          isOpen={this.state.showModal} 
          onClose={this.closeModal}  
        />
      </div>
    );
  }
}
