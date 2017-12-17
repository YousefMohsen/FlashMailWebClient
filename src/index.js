import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NewMessage from './NavigationPages/NewMessage/NewMessage';
import NewTeam from './NavigationPages/NewTeam/NewTeam';
import EditTeam from './NavigationPages/EditTeam/EditTeam';
import SentMessages from './NavigationPages/SentMessages/SentMessages'
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import store from './Data/redux/store'
import ActionFactory from './Data/redux/actions'
import { Provider } from 'react-redux';

ReactDOM.render((

    <Provider store={store} actionsFactory={ActionFactory}>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={NewMessage} />
                <Route path='/newTeam' component={NewTeam} />
                <Route path='/editTeam' component={EditTeam} />
                <Route path='/sent' component={SentMessages} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
