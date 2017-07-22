import { CALL_API } from 'redux-api-middleware';
import { fetchApi, reqHeaders } from '../../../../utils/api';
import {
  SERVER_GET_JOB_REQUEST,
  SERVER_GET_JOB_SUCCESS,
  SERVER_GET_JOB_FAILURE
} from '../ducks';

export function serverGetJob(originalUrl, req) {
  const endpoint = `http://localhost:8000/api/v0/${originalUrl}`;
  return {
    [CALL_API]: {
      endpoint,
      method: 'GET',
      headers: reqHeaders('', req.cookies),
      types: [
        SERVER_GET_JOB_REQUEST,
        {
          type: SERVER_GET_JOB_SUCCESS,
          payload: (action, state, response) => response.json().then(res => res)
        },
        {
          type: SERVER_GET_JOB_FAILURE,
          payload: (action, state, response) => response.json().then(res => res)
        }
      ]
    }
  };
}
