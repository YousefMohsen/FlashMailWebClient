import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MsgForm from './NavigationPages/NewMessage/MsgForm'; 
import NewTeam from './NavigationPages/NewTeam/NewTeam';
import EditTeam from './NavigationPages/EditTeam/EditTeam';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'

ReactDOM.render((
    
    
    
    <Router history={hashHistory}>
    
    
    <Route path='/' component={App}>
    <IndexRoute component={EditTeam}/> 
    
    <Route path='/newTeam' component={NewTeam}/>
    <Route path='/editTeam' component={EditTeam}/>
    
    </Route>
    </Router>







), document.getElementById('root'));
registerServiceWorker();
