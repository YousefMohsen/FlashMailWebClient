import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router";
import { observer } from "mobx-react";
import Header  from './Header'





const App = observer(class App extends Component {
  render() {
    return (
      <div>
<Header/>

      <nav className="navbar navbar-default" >
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="">Forside</a>
        </div>
        <ul className="nav navbar-nav">
  
        <li><Link to="/">Send en besked </Link></li>
        <li><Link to="/newTeam">Opret et nyt hold </Link></li>
        
           
        </ul>
      </div>
    </nav>


















      {this.props.children}
      
      </div>


      );
  }
})

export default App;
