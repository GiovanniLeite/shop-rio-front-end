import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from '../../../store/modules/auth/actions';

import { Container } from './styled';
import Loading from '../../Loading';

export default function Address(props) {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const history = get(props, 'history');
  const dispatch = useDispatch();

  const [addressData, setaddressData] = useState({
    id: get(user.Addresses[0], 'id', ''),
    user_id: user.id || '',
    postal_code: get(user.Addresses[0], 'postal_code', ''),
    house_number: get(user.Addresses[0], 'house_number', ''),
    street: get(user.Addresses[0], 'street', ''),
    district: get(user.Addresses[0], 'district', ''),
    obs: get(user.Addresses[0], 'obs', ''),
    history,
  });

  const handleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setaddressData({ ...addressData, [name]: value });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    document.getElementById('postalCode').disabled = false;
    document.getElementById('houseNumber').disabled = false;
    document.getElementById('street').disabled = false;
    document.getElementById('district').disabled = false;
    document.getElementById('obs').disabled = false;
    document.getElementById('editAddress').disabled = true;
    document.getElementById('saveAddress').disabled = false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    const postalCode = document.getElementById('postalCode');
    const houseNumber = document.getElementById('houseNumber');
    const street = document.getElementById('street');
    const district = document.getElementById('district');

    if (!addressData.user_id) {
      formErrors = true;
      toast.error('Erro');
    }

    if (user.open_cart !== 1) {
      formErrors = true;
      toast.error('Endereço não pode ser alterado com carrinho fechado');
    }

    // format validation CEP - 18040410
    const validate = /^[0-9]{8}$/;
    if (addressData.postal_code === '' || !validate.test(addressData.postal_code)) {
      formErrors = true;
      toast.error('Formato de CEP inválido, inclua apenas números');
      postalCode.style.border = '1px solid #ff0000';
    }

    if (!parseInt(addressData.house_number)) {
      formErrors = true;
      toast.error('Número inválido');
      houseNumber.style.border = '1px solid #ff0000';
    }

    if (addressData.street.length < 3 || addressData.street.length > 50) {
      formErrors = true;
      toast.error('Rua deve ter entre 3 e 50 caracteres');
      street.style.border = '1px solid #ff0000';
    }

    if (addressData.district.length < 3 || addressData.district.length > 50) {
      formErrors = true;
      toast.error('Bairro deve ter entre 3 e 50 caracteres');
      district.style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    postalCode.disabled = true;
    houseNumber.disabled = true;
    street.disabled = true;
    district.disabled = true;
    document.getElementById('obs').disabled = true;
    document.getElementById('editAddress').disabled = false;
    document.getElementById('saveAddress').disabled = true;

    dispatch(actions.addressRegisterRequest({ ...addressData }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="postalCode" title="Apenas números, Campo Obrigatório">
          *CEP:
          <input
            id="postalCode"
            name="postal_code"
            type="text"
            value={addressData.postal_code}
            onChange={(e) => handleFormData(e)}
            placeholder="Ex. 18080000"
            title="Apenas números"
            disabled
          />
        </label>
        <label htmlFor="houseNumber" title="Campo Obrigatório">
          *Número:
          <input
            id="houseNumber"
            name="house_number"
            type="text"
            value={addressData.house_number}
            onChange={(e) => handleFormData(e)}
            placeholder="Ex. 987"
            disabled
          />
        </label>
        <label htmlFor="street" title="Campo Obrigatório">
          *Rua:
          <input
            id="street"
            name="street"
            type="text"
            value={addressData.street}
            onChange={(e) => handleFormData(e)}
            placeholder="Ex. Rua Sete Setembro"
            disabled
          />
        </label>
        <label htmlFor="district" title="Campo Obrigatório">
          *Bairro:
          <input
            id="district"
            name="district"
            type="text"
            value={addressData.district}
            onChange={(e) => handleFormData(e)}
            placeholder="Ex. Jardim Residencial Nikkey"
            disabled
          />
        </label>
        <label htmlFor="obs">
          Complemento:
          <input
            id="obs"
            name="obs"
            type="text"
            value={addressData.obs}
            onChange={(e) => handleFormData(e)}
            placeholder="Ex. Casa dos fundos"
            disabled
          />
        </label>
        <button
          id="editAddress"
          onClick={(e) => {
            handleEdit(e);
          }}
        >
          Editar
        </button>
        <button id="saveAddress" type="submit" disabled>
          Salvar
        </button>
      </form>
    </Container>
  );
}
