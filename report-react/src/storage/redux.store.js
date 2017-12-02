import {applyMiddleware, combineReducers, createStore} from 'redux';
import {routerMiddleware, routerReducer as router} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createHashHistory';
import {fork} from 'redux-saga/effects';

import reports from '../reports/report.reducer';
import reportSaga from '../reports/report.saga';

export const history = createHistory();

const saga = createSagaMiddleware();
const store = createStore(
    combineReducers({
        reports,
        router,
    }),
    applyMiddleware(
        routerMiddleware(history),
        saga
    )
);

saga.run(function* () {
    yield [
        fork(reportSaga),
    ];
});

export default store;
