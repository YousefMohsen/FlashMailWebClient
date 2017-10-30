import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MsgForm from './MsgForm'; 
import NewTeam from './NewTeam';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'

ReactDOM.render((
    
    
    
    <Router history={hashHistory}>
    
    
    <Route path='/' component={App}>
    <IndexRoute component={MsgForm}/>
    
    <Route path='/newTeam' component={NewTeam}/>
           
    </Route>
    </Router>







), document.getElementById('root'));
registerServiceWorker();
