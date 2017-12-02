import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Route} from 'react-router';
import store, {history} from './storage/redux.store';
import 'raf/polyfill';

import Reports from './reports';

ReactDOM.render(
    (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div id='app'>
                    <Route exact path='/' component={Reports}/>
                </div>
            </ConnectedRouter>
        </Provider>
    ),
    document.getElementById('root')
);
