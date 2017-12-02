import config from '../config';
import request from 'axios';

export async function fetch() {
    return await request.get(`${config.api}/reports`);
}

export async function update(id, state) {
    return await request.put(`${config.api}/reports/${id}`, {ticketState: state});
}