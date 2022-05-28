import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import cpfFmt from '@lacussoft/cpf-fmt';
import { get } from 'lodash';

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
    updateType: 1,
    history,
  });

  const handleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    document.getElementById('name').disabled = false;
    document.getElementById('cpf').disabled = false;
    document.getElementById('birthDate').disabled = false;
    document.getElementById('phone').disabled = false;
    document.getElementById('cell').disabled = false;
    document.getElementById('editUser').disabled = true;
    document.getElementById('saveUser').disabled = false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;
    const name = document.getElementById('name');
    const cpf = document.getElementById('cpf');
    const phone = document.getElementById('phone');
    const cell = document.getElementById('cell');

    if (userData.name.length < 3 || userData.name.length > 50) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 50 caracteres');
      name.style.border = '1px solid #ff0000';
    }

    if (!cpfValidation(userData.cpf)) {
      formErrors = true;
      toast.error('CPF inválido');
      cpf.style.border = '1px solid #ff0000';
    }

    // format validation Phone - 1532275064
    const validatePhone = /^[0-9]{10}$/;
    if (userData.phone != '' && !validatePhone.test(userData.phone)) {
      formErrors = true;
      toast.error('Formato de Telefone inválido, inclua apenas números');
      phone.style.border = '1px solid #ff0000';
    }

    // format validation Cel - 15981287922
    const validateCell = /^[0-9]{11}$/;
    if (userData.cell != '' && !validateCell.test(userData.cell)) {
      formErrors = true;
      toast.error('Formato de Celular inválido, inclua apenas números');
      cell.style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    document.getElementById('name').disabled = true;
    name.disabled = true;
    cpf.disabled = true;
    document.getElementById('birthDate').disabled = true;
    document.getElementById('phone').disabled = true;
    document.getElementById('cell').disabled = true;
    document.getElementById('editUser').disabled = false;
    document.getElementById('saveUser').disabled = true;

    dispatch(actions.registerRequest({ ...userData }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" title="Campo Obrigatório">
          *Nome:
          <input
            id="name"
            name="name"
            type="text"
            value={userData.name}
            onChange={(e) => handleFormData(e)}
            placeholder="Seu nome"
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
            placeholder="Ex. 999.999.999-99"
            disabled
          />
        </label>
        <label htmlFor="birthDate">
          Data de Nascimento:
          <input
            id="birthDate"
            name="birth_date"
            type="text"
            value={userData.birth_date}
            onChange={(e) => handleFormData(e)}
            placeholder="Ex. 09/09/1999"
            disabled
          />
        </label>
        <label htmlFor="phone" title="Apenas números">
          Telefone:
          <input
            id="phone"
            name="phone"
            type="text"
            value={userData.phone}
            onChange={(e) => handleFormData(e)}
            placeholder="Ex. 1532275064"
            disabled
          />
        </label>
        <label htmlFor="cell" title="Apenas números">
          Celular:
          <input
            id="cell"
            name="cell"
            type="text"
            value={userData.cell}
            onChange={(e) => handleFormData(e)}
            placeholder="Ex. 15981287422"
            disabled
          />
        </label>
        <button
          id="editUser"
          onClick={(e) => {
            handleEdit(e);
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
