import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload,
  };
}

export function registerUpdatedSuccess(payload) {
  return {
    type: types.REGISTER_UPDATED_SUCCESS,
    payload,
  };
}

export function registerFailure(payload) {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
}

export function deleteUserRequest(payload) {
  return {
    type: types.DELETE_USER_REQUEST,
    payload,
  };
}

export function addressRegisterRequest(payload) {
  return {
    type: types.ADDRESS_REGISTER_REQUEST,
    payload,
  };
}

export function addressRegisterSuccess(payload) {
  return {
    type: types.ADDRESS_REGISTER_SUCCESS,
    payload,
  };
}

export function addressRegisterFailure(payload) {
  return {
    type: types.ADDRESS_REGISTER_FAILURE,
    payload,
  };
}
