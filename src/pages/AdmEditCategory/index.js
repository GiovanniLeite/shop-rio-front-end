import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import useHandleError from '../../utils/useHandleError';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';
import Loading from '../../components/Loading';

export default function AdmEditCategory({ match, history }) {
  const user = useSelector((state) => state.auth.user);
  if (user.adm !== 1 && user.adm !== 2) {
    history.push('/home/');
  }

  const newCategory = get(match, 'params.new', '');
  const id = get(match, 'params.id', '');
  const [categoryData, setCategoryData] = useState({
    id: id || '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleError = useHandleError();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        if (!id) {
          setIsLoading(false);
          return;
        }

        const { data } = await axios.get(`/categories/${id}`);
        setCategoryData({ ...categoryData, name: data.name });
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
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (categoryData.name.length < 3 || categoryData.name.length > 50) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 50 caracteres');
      document.getElementById('name').style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    setIsLoading(true);
    try {
      if (id) {
        await axios.put(`/categories/${categoryData.id}`, categoryData);
        toast.success('Editado com sucesso!');
      } else {
        const { data } = await axios.post(`/categories/`, categoryData);
        setCategoryData({ ...categoryData, id: data.id });
        history.push(`/adm/edit-categories/${data.id}`);
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
        <title>{newCategory ? 'Nova Categoria' : categoryData.name} | Administrador | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Loading isLoading={isLoading} />
        <Container>
          <form onSubmit={handleSubmit}>
            <h2>{newCategory ? 'Nova Categoria' : 'Editar Categoria'}</h2>
            <label htmlFor="id">
              Código:
              <input id="id" type="text" value={id} disabled />
            </label>
            <label htmlFor="name" title="Campo Obrigatório">
              *Nome:
              <input
                id="name"
                type="text"
                name="name"
                value={categoryData.name}
                onChange={(e) => handleFormData(e)}
                placeholder="Nome"
              />
            </label>
            <button type="submit">{newCategory ? 'Criar Categoria' : 'Salvar'}</button>
          </form>
        </Container>
      </MainContainer>
    </>
  );
}

AdmEditCategory.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
