import React, { Component } from 'react';
import logo from '../images/LogoWhite.png'
import './Header.css';

/**
 * HEader used in app.js
 */
class Header extends Component {


  render() {
    
    return (
      <div>

      <header className="App-header">
      <img src={logo} alt="logo" />
      </header>

      </div>
    );
  }
}

export default Header;
