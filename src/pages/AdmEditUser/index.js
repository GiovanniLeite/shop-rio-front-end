import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { isEmail } from 'validator';

import axios from '../../services/axios';
import useHandleError from '../../utils/useHandleError';
import cpfValidation from '../../utils/cpfValidation';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';
import Loading from '../../components/Loading';

export default function AdmEditUser({ match, history }) {
  const currentUser = useSelector((state) => state.auth.user);
  if (currentUser.adm !== 2) {
    history.push('/home/');
  }
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(false);

  const newUser = get(match, 'params.new', '');
  const id = get(match, 'params.id', '');

  const [userData, setUserData] = useState({
    id: id || '',
    name: '',
    cpf: '',
    email: '',
    open_cart: 0,
    adm: 1,
    current_cart_code: 0,
    password: '',
  });
  const [password2, setPassword2] = useState('');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        if (!id) {
          setIsLoading(false);
          return;
        }

        const { data } = await axios.get(`/users/${id}`);
        setUserData({
          ...userData,
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          adm: data.adm,
          password: data.password || '',
        });
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }

    getData();
    // eslint-disable-next-line
  }, []);

  const handleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (userData.name.length < 3 || userData.name.length > 50) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 50 caracteres');
      document.getElementById('name').style.border = '1px solid #ff0000';
    }

    if (!cpfValidation(userData.cpf)) {
      formErrors = true;
      toast.error('CPF inválido');
      document.getElementById('cpf').style.border = '1px solid #ff0000';
    }

    if (!isEmail(userData.email)) {
      formErrors = true;
      toast.error('Email inválido');
      document.getElementById('email').style.border = '1px solid #ff0000';
    }

    if (userData.password !== password2) {
      formErrors = true;
      toast.error('Senha e confirmação devem ser iguais');
      document.getElementById('password').style.border = '1px solid #ff0000';
      document.getElementById('password2').style.border = '1px solid #ff0000';
    }

    if (userData.password.length < 8 || userData.password.length > 16) {
      formErrors = true;
      toast.error('Senha deve ter pelo menos 8 caracteres');
      document.getElementById('password').style.border = '1px solid #ff0000';
      document.getElementById('password2').style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    setIsLoading(true);
    try {
      if (id) {
        await axios.put(`/users/adm/${userData.id}`, userData);
        toast.success('Editado com sucesso!');
      } else {
        const { data } = await axios.post(`/users/adm/`, userData);
        setUserData({ ...userData, id: data.id });
        history.push(`/adm/edit-users/${data.id}`);
        toast.success('Criado com sucesso!');
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>{newUser ? 'Novo Usuário' : 'Editar Usuário'} | Administrador | shopRio</title>

        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Loading isLoading={isLoading} />
        <Container>
          <form onSubmit={handleSubmit}>
            <h2>{newUser ? 'Novo Usuário' : 'Editar Usuário'}</h2>
            <label htmlFor="id">
              Código:
              <input id="id" type="text" value={id} disabled />
            </label>
            <label htmlFor="name" title="Campo Obrigatório">
              *Nome:
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={(e) => handleFormData(e)}
                placeholder="Nome"
              />
            </label>
            <label htmlFor="cpf" title="Campo Obrigatório">
              *CPF:
              <InputMask
                mask="999.999.999-99"
                type="text"
                id="cpf"
                name="cpf"
                value={userData.cpf}
                onChange={(e) => handleFormData(e)}
                placeholder="CPF"
                title="999.999.999-99"
              />
            </label>
            <label htmlFor="adm">
              Adm Nível:
              <select id="adm" name="adm" value={userData.adm} onChange={(e) => handleFormData(e)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </label>
            <label htmlFor="email">
              *Email:
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleFormData(e)}
                placeholder="example@outlook.com"
                title="Campo Obrigatório"
              />
            </label>
            <label htmlFor="password">
              *Senha:
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => handleFormData(e)}
                title="Campo Obrigatório"
              />
            </label>
            <label htmlFor="password2">
              *Confirmação:
              <input
                id="password2"
                type="password"
                onChange={(e) => setPassword2(e.target.value)}
                title="Campo Obrigatório"
              />
            </label>
            <button type="submit">{newUser ? 'Criar usuário' : 'Salvar'}</button>
          </form>
        </Container>
      </MainContainer>
    </>
  );
}

AdmEditUser.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
