import { browserHistory } from 'react-router';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILURE = 'RESET_FAILURE';

export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAILURE = 'PASSWORD_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  isResettingPassword: false,
  token: '',
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTH_REQUEST:
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    case AUTH_SUCCESS:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        ...action.payload.data
      });
    case RESET_REQUEST:
    case PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isResettingPassword: true
      });
    case RESET_SUCCESS:
    case PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isResettingPassword: false,
        ...action.payload.data
      });
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        errors: action.errors.errors
      });
    case RESET_FAILURE:
    case PASSWORD_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors.errors
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        errors: action.errors.errors
      });
    case 'SHOW_MODAL':
    case LOGOUT_SUCCESS:
      return window.__INITIAL_STATE__;
    default:
      return state;
  }
};

export const auth = redirectPathname => ({
  type: AUTH_REQUEST,
  payload: { redirectPathname }
});

export const reset = email => ({
  type: RESET_REQUEST,
  payload: { email }
});

export const password = (resetPasswordToken, confirmPassword, password) => ({
  type: PASSWORD_REQUEST,
  payload: { resetPasswordToken, confirmPassword, password }
});

export const signup = (email, password, redirectPathname) => ({
  type: SIGNUP_REQUEST,
  payload: { email, password, redirectPathname }
});

export const login = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password }
});

export const logout = userId => ({ type: LOGOUT_REQUEST });

export const redirectTo = redirectPathname =>
  browserHistory.push(redirectPathname);
