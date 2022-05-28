import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import axios from '../../services/axios';
import useHandleError from '../../utils/useHandleError';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';
import Loading from '../../components/Loading';

export default function EditImage({ match, history }) {
  const handleError = useHandleError();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/products/${id}`);
        setImages(get(data, 'Pictures', []));
      } catch {
        toast.error('Erro ao obter imagem');
        history.push('/');
      }
      setIsLoading(false);
    };

    getData();
  }, [id, history]);

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('product_id', id);
    formData.append('picture', file);

    setIsLoading(true);
    try {
      const { data } = await axios.post('/pictures/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newData = [...images];
      newData.unshift(data);
      setImages(newData);

      toast.success('Foto enviada com sucesso!');
    } catch (err) {
      toast.error('Erro ao enviar imagem.');

      handleError(err);
    }
    setIsLoading(false);
  };

  const handleRemoveImage = async (id, index) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`/pictures/${id}`);
      if (get(data, 'deleted', false)) {
        const newData = [...images];
        newData.splice(index, 1);
        setImages(newData);

        toast.success(`Imagem removida com sucesso!`);
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Uploads | Administrador | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Loading isLoading={isLoading} />
        <Container>
          <div className="box">
            <form>
              <h4>Adicionar Imagem</h4>
              <label htmlFor="file">
                Selecionar
                <input type="file" id="file" onChange={handleAddImage} />
              </label>
            </form>

            <div className="removeImg">
              {images.map((e, index) => (
                <div key={e.id}>
                  <img src={e.url} alt="File" />
                  <button onClick={() => handleRemoveImage(e.id, index)}>
                    <FaTrash /> Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </MainContainer>
    </>
  );
}

EditImage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
