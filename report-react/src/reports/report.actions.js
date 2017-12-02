import {FETCH_REPORTS, UPDATE_REPORT} from './report.constants';

export function fetch() {
    return {
        type: FETCH_REPORTS,
    }
}

export function update(id, state) {
    return {
        type: UPDATE_REPORT,
        id,
        state,
    }
}
