import { get } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import * as actions from '../../../store/modules/auth/actions';
import Loading from '../../Loading';

import { Container } from './styled';

export default function Security(props) {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const history = get(props, 'history');
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [userData, setUserData] = useState({
    id: user.id || '',
    name: user.name || '',
    cpf: user.cpf || '',
    birth_date: user.birth_date || '',
    phone: user.phone || '',
    cell: user.cell || '',
    email: user.email || '',
    open_cart: user.open_cart || '',
    adm: user.adm || '',
    current_cart_code: user.current_cart_code || '',
    history,
  });

  const [updateEmail, setUpdateEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const handleUpdateEmail = (e) => {
    e.preventDefault();

    if (!isEmail(updateEmail)) {
      toast.error('Email inválido');
      document.getElementById('updateEmail').style.border = '1px solid #ff0000';
      return;
    }

    dispatch(actions.registerRequest({ ...userData, email: updateEmail, updateType: 2 }));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    let formErrors = false;
    const pass = document.getElementById('newPassword');
    const passConfirm = document.getElementById('newPasswordCheck');

    if (newPassword.length < 8 || newPassword.length > 16) {
      formErrors = true;
      toast.error('Senha deve ter entre 8 e 16 caracteres');
      pass.style.border = '1px solid #ff0000';
      passConfirm.style.border = '1px solid #ff0000';
    }

    if (newPassword !== newPasswordCheck) {
      formErrors = true;
      toast.error('Senha e confirmação devem ser iguais');
      pass.style.border = '1px solid #ff0000';
      passConfirm.style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ ...userData, password: newPassword, updateType: 3 }));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(deleteEmail)) {
      toast.error('Email inválido');
      document.getElementById('deleteEmail').style.border = '1px solid #ff0000';
    }

    if (deletePassword.length < 8 || deletePassword.length > 16) {
      formErrors = true;
      toast.error('Senha inválida');
      document.getElementById('deletePassword').style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    dispatch(actions.deleteUserRequest({ id: userData.id, email: deleteEmail, password: deletePassword }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <form className="email" onSubmit={handleUpdateEmail}>
        <label htmlFor="updateEmail">
          *Email:
          <input
            id="updateEmail"
            type="email"
            onChange={(e) => setUpdateEmail(e.target.value)}
            title="Campo Obrigatório"
          />
        </label>
        <button type="submit">Alterar Email</button>
      </form>
      <form onSubmit={handleUpdatePassword}>
        <label htmlFor="newPassword">
          *Nova Senha:
          <input
            id="newPassword"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            title="Campo Obrigatório"
          />
        </label>
        <label htmlFor="newPasswordCheck">
          *Confirmação:
          <input
            id="newPasswordCheck"
            type="password"
            onChange={(e) => setNewPasswordCheck(e.target.value)}
            title="Campo Obrigatório"
          />
        </label>
        <button type="submit">Alterar Senha</button>
      </form>
      <form onSubmit={handleDelete}>
        <label htmlFor="deleteEmail">
          *Email:
          <input
            id="deleteEmail"
            type="email"
            onChange={(e) => setDeleteEmail(e.target.value)}
            title="Campo Obrigatório"
          />
        </label>
        <label htmlFor="deletePassword">
          *Senha:
          <input
            id="deletePassword"
            type="password"
            onChange={(e) => setDeletePassword(e.target.value)}
            title="Campo Obrigatório"
          />
        </label>
        <button className="delete" type="submit">
          Ecluir Conta
        </button>
      </form>
    </Container>
  );
}
