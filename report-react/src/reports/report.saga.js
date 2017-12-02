import {call, put, takeLatest} from 'redux-saga/effects';
import {fetch, update} from './report.api';
import {
    FETCH_REPORTS,
    FETCH_REPORTS_ERROR,
    FETCH_REPORTS_SUCCESS,
    UPDATE_REPORT,
    UPDATE_REPORT_ERROR,
    UPDATE_REPORT_SUCCESS
} from './report.constants';

function* fetchReports() {
    try {
        const response = yield call(fetch);
        yield put({type: FETCH_REPORTS_SUCCESS, results: response.data});
    } catch (error) {
        yield put({type: FETCH_REPORTS_ERROR});
    }
}

function* updateReport({id, state}) {
    try {
        yield call(update, id, state);
        yield put({type: UPDATE_REPORT_SUCCESS});
        yield put({type: FETCH_REPORTS});
    } catch (error) {
        yield put({type: UPDATE_REPORT_ERROR});
    }
}

export default function* metricsSaga() {
    yield takeLatest(FETCH_REPORTS, fetchReports);
    yield takeLatest(UPDATE_REPORT, updateReport);
}
