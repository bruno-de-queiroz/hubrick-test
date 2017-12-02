import {FETCH_REPORTS_ERROR, FETCH_REPORTS_SUCCESS} from './report.constants';

export default function reducer(state = [], action) {

    switch (action.type) {
        case FETCH_REPORTS_SUCCESS: {
            return [...action.results.elements];
        }
        case FETCH_REPORTS_ERROR: {
            return [...state];
        }
    }

    return state;
}
