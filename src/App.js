import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router";
import { observer } from "mobx-react";
import Header from './SmallComp/Header'


const App = observer(class App extends Component {
  render() {
    console.log(this.props.test)
    return (
      <div>

        <nav className="navbar navbar-inverse" >
          <Header />
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><Link to="/">Send Message </Link></li>
              <li><Link to="/newTeam">Create teams </Link></li>
              <li><Link to="/editTeam">Edit teams </Link></li>
              <li><Link to="/sent">Sent messages </Link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Sign out</a></li>
            </ul>
          </div>
        </nav>


        {this.props.children}


      </div>


    );
  }
})

export default App;
/*
     <div className="navbar-header">
          <a className="navbar-brand" href="/">Forside</a>
        </div>

*/