import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { isEmail } from 'validator';
import { Helmet } from 'react-helmet';
import { get } from 'lodash';

import * as actions from '../../store/modules/auth/actions';
import cpfValidation from '../../utils/cpfValidation';
import generateCartCode from '../../utils/generateCartCode';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';
import Loading from '../../components/Loading';

export default function UserPage(props) {
  const dispatch = useDispatch();
  const history = get(props, 'history');
  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [userDataRegister, setUserDataRegister] = useState({
    name: '',
    cpf: '',
    email: '',
    open_cart: 1,
    password: '',
    adm: 0,
    current_cart_code: '',
    prevPath,
    history,
  });
  const [userDataLogin, setUserDataLogin] = useState({
    email: '',
    password: '',
    prevPath,
    history,
  });

  function handleChange(e, register) {
    const { name, value } = e.target;

    if (register) {
      setUserDataRegister({ ...userDataRegister, [name]: value });
    } else {
      setUserDataLogin({ ...userDataLogin, [name]: value });
    }
  }

  async function handleSubmit(e, register) {
    e.preventDefault();
    let formErrors = false;

    if (register) {
      if (userDataRegister.name.length < 3 || userDataRegister.name.length > 50) {
        formErrors = true;
        toast.error('Nome deve ter entre 3 e 50 caracteres');
        document.getElementById('name').style.border = '1px solid #ff0000';
      }

      if (!cpfValidation(userDataRegister.cpf)) {
        formErrors = true;
        toast.error('CPF inválido');
        document.getElementById('cpf').style.border = '1px solid #ff0000';
      }

      if (!isEmail(userDataRegister.email)) {
        formErrors = true;
        toast.error('Email inválido');
        document.getElementById('emailRegister').style.border = '1px solid #ff0000';
      }

      const pass = document.getElementById('passwordRegister');
      const passConfirm = document.getElementById('passwordConfirmation');

      if (userDataRegister.password.length < 8 || userDataRegister.password.length > 16) {
        formErrors = true;
        toast.error('Senha deve ter entre 8 e 16 caracteres');
        pass.style.border = '1px solid #ff0000';
        passConfirm.style.border = '1px solid #ff0000';
      }

      if (userDataRegister.password !== passwordConfirmation) {
        formErrors = true;
        toast.error('Senha e confirmação devem ser iguais');
        pass.style.border = '1px solid #ff0000';
        passConfirm.style.border = '1px solid #ff0000';
      }

      if (formErrors) return;
      const newCartCode = generateCartCode('a');
      dispatch(actions.registerRequest({ ...userDataRegister, current_cart_code: newCartCode }));
    } else {
      if (userDataLogin.email.trim() === '') {
        formErrors = true;
        toast.error('Campo Email não deve estar vazio');
        document.getElementById('emailLogin').style.border = '1px solid #ff0000';
      }

      if (userDataLogin.password.trim() === '') {
        formErrors = true;
        toast.error('Campo Senha não deve estar vazio');
        document.getElementById('passwordLogin').style.border = '1px solid #ff0000';
      }

      if (formErrors) return;
      dispatch(actions.loginRequest({ ...userDataLogin }));
    }
  }

  return (
    <>
      <Helmet>
        <title>Login - Registro | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Container>
          <Loading isLoading={isLoading} />
          <section className="leftContent">
            <div className="loginSub">
              <form onSubmit={(e) => handleSubmit(e, false)}>
                <h2>Login</h2>
                <input
                  id="emailLogin"
                  type="email"
                  name="email"
                  onChange={(e) => handleChange(e, false)}
                  placeholder="exemplo@outlook.com"
                  title="Email"
                />
                <input
                  id="passwordLogin"
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e, false)}
                  placeholder="Senha"
                  title="Senha"
                />
                <button>Entrar</button>
              </form>
            </div>
          </section>
          <section className="rightContent">
            <form onSubmit={(e) => handleSubmit(e, true)}>
              <h2>Registrar</h2>
              <input
                id="name"
                type="text"
                name="name"
                onChange={(e) => handleChange(e, true)}
                placeholder="Nome"
                title="Nome"
              />
              <InputMask
                mask="999.999.999-99"
                id="cpf"
                type="text"
                name="cpf"
                onChange={(e) => handleChange(e, true)}
                placeholder="999.999.999-99"
                title="999.999.999-99"
              />
              <input
                id="emailRegister"
                type="email"
                name="email"
                onChange={(e) => handleChange(e, true)}
                placeholder="exemplo@outlook.com"
                title="exemplo@outlook.com"
              />
              <input
                id="passwordRegister"
                type="password"
                name="password"
                onChange={(e) => handleChange(e, true)}
                placeholder="Senha"
                title="Senha"
              />
              <input
                id="passwordConfirmation"
                type="password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Cofirmação de senha"
                title="Cofirmação de senha"
              />
              <button>Registrar-se</button>
            </form>
          </section>
        </Container>
      </MainContainer>
    </>
  );
}
