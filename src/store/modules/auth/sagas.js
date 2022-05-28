import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    payload.history.push('/home');
  } catch (e) {
    toast.error('Email ou senha inválidos.');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const {
    id,
    name,
    cpf,
    birth_date,
    phone,
    cell,
    email,
    open_cart,
    password,
    adm,
    current_cart_code,
    updateType,
    history,
  } = payload;

  let relogin = false;

  try {
    if (!id) {
      yield call(axios.post, '/users', {
        name,
        cpf,
        email,
        open_cart,
        password: password || undefined,
        adm,
        current_cart_code,
      });
      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess({}));
      history.push('/login');
    } else {
      switch (updateType) {
        case 1: // update basic user information - UserProfile/Profile
          yield call(axios.put, `/users/${id}`, {
            name,
            cpf,
            birth_date,
            phone,
            cell,
          });
          break;
        case 2: // update email - UserPrifile/Security - AdmProfile/Security
          yield call(axios.put, `/users/${id}`, {
            email,
          });
          toast.success('Email atualizado com sucesso!');
          toast.success('Você precisa fazer login novamente.');
          yield put(actions.loginFailure());
          relogin = true;
          break;
        case 3: // update password - UserPrifile/Security - AdmProfile/Security
          yield call(axios.put, `/users/${id}`, {
            password,
          });
          toast.success('Senha atualizada com sucesso!');
          toast.success('Você precisa fazer login novamente.');
          yield put(actions.loginFailure());
          relogin = true;
          break;
        case 4: // update cart open/close - UserPrifile/Cart
          yield call(axios.put, `/users/${id}`, {
            open_cart,
          });
          break;
        case 5: // update adm user information - AdmProfile/Profile
          yield call(axios.put, `/users/${id}`, {
            name,
            cpf,
          });
          break;
      }

      if (relogin) return;

      updateType != 4 && toast.success('Conta atualizada com sucesso!');
      yield put(
        actions.registerUpdatedSuccess({
          name,
          cpf,
          birth_date,
          phone,
          cell,
          email,
          open_cart,
          adm,
          current_cart_code,
        }),
      );
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

function* deleteUserRequest({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(axios.post, '/tokens', payload);

    if (get(response.data, 'user', '')) {
      yield call(axios.delete, `/users/${id}`);
      toast.success('Conta excluída');
    }
  } catch (e) {
    const data = get(e, 'response.data', {});
    const errors = get(data, 'errors', []);

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }
  }
  yield put(actions.loginFailure());
}

function* addressRegisterRequest({ payload }) {
  const { id, history } = payload;

  try {
    if (id) {
      yield call(axios.put, `/addresses/${id}`, payload);
      yield put(actions.addressRegisterSuccess(payload));
    } else {
      const response = yield call(axios.post, '/addresses', payload);
      yield put(actions.addressRegisterSuccess(response.data));
    }
    toast.success('Endereço atualizado com sucesso!');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.addressRegisterFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.ADDRESS_REGISTER_REQUEST, addressRegisterRequest),
  takeLatest(types.DELETE_USER_REQUEST, deleteUserRequest),
]);
