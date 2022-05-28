import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import cpfFmt from '@lacussoft/cpf-fmt';

import * as actions from '../../../store/modules/auth/actions';
import cpfValidation from '../../../utils/cpfValidation';

import { Container } from './styled';
import Loading from '../../Loading';

export default function Profile(props) {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const history = get(props, 'history');
  const dispatch = useDispatch();

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
    updateType: 5,
    history,
  });

  const handleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleEditUser = (e) => {
    e.preventDefault();

    document.getElementById('name').disabled = false;
    document.getElementById('cpf').disabled = false;
    document.getElementById('editUser').disabled = true;
    document.getElementById('saveUser').disabled = false;
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    let formErrors = false;
    const nameInput = document.getElementById('name');
    const cpfInput = document.getElementById('cpf');

    if (userData.name.length < 3 || userData.name.length > 50) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 50 caracteres');
      nameInput.style.border = '1px solid #ff0000';
    }

    if (!cpfValidation(userData.cpf)) {
      formErrors = true;
      toast.error('CPF inválido');
      cpfInput.style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    nameInput.disabled = true;
    cpfInput.disabled = true;
    document.getElementById('editUser').disabled = false;
    document.getElementById('saveUser').disabled = true;

    dispatch(actions.registerRequest({ ...userData }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <form onSubmit={handleSubmitUser}>
        <label htmlFor="name" title="Campo Obrigatório">
          *Nome:
          <input
            id="name"
            name="name"
            type="text"
            value={userData.name}
            onChange={(e) => handleFormData(e)}
            placeholder="Nome"
            disabled
          />
        </label>
        <label htmlFor="cpf" title="Campo Obrigatório">
          *CPF:
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={cpfFmt(userData.cpf)}
            onChange={(e) => handleFormData(e)}
            placeholder="CPF"
            disabled
          />
        </label>
        <label htmlFor="level" title="2 - Adm total&#013;1 - Adm parcial&#013;0 - Usuário comum">
          Adm Nível:
          <input id="level" type="text" value={userData.adm} placeholder="Adm Nível" disabled />
        </label>
        <button
          id="editUser"
          onClick={(e) => {
            handleEditUser(e);
          }}
        >
          Editar
        </button>
        <button id="saveUser" type="submit" disabled>
          Salvar
        </button>
      </form>
    </Container>
  );
}
