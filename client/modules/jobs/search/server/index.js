import { CALL_API } from 'redux-api-middleware';
import { fetchApi, reqHeaders } from '../../../../utils/api';
import {
  SERVER_SEARCH_JOBS_REQUEST,
  SERVER_SEARCH_JOBS_SUCCESS,
  SERVER_SEARCH_JOBS_FAILURE
} from '../ducks';
import queryString from 'query-string';

export function serverGetJobs(queryData, req) {
  const query = queryString.stringify(queryData);
  const endpoint = `http://localhost:8000/api/v0/search/jobs?${query}`;
  return {
    [CALL_API]: {
      endpoint,
      method: 'GET',
      headers: reqHeaders('', req.cookies),
      types: [
        {
          type: SERVER_SEARCH_JOBS_REQUEST,
          payload: { query }
        },
        {
          type: SERVER_SEARCH_JOBS_SUCCESS,
          payload: (action, state, response) => response.json().then(res => res)
        },
        {
          type: SERVER_SEARCH_JOBS_FAILURE,
          errors: (action, state, response) => response.json().then(res => res)
        }
      ]
    }
  };
}