import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import axios from '../../services/axios';
import useHandleError from '../../utils/useHandleError';
import CurrencyInput from '../../components/CurrencyInput';
import api_url from '../../config/api';

import MainContainer from '../../components/MainContainer';
import { Container, Picture } from './styled';
import Loading from '../../components/Loading';

export default function AdmEditProduct({ match, history }) {
  const user = useSelector((state) => state.auth.user);
  if (user.adm !== 1 && user.adm !== 2) {
    history.push('/home/');
  }

  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(false);

  const newProduct = get(match, 'params.new', '');
  const id = get(match, 'params.id', '');

  const [categories, setCategories] = useState([]);

  const [productData, setProductData] = useState({
    id: id || '',
    name: '',
    price: '',
    discount: '',
    category_id: '',
    category_name: '',
    description: '',
    quantity: '',
  });
  const [image, setImage] = useState('');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get('/categories/');
        setCategories(response.data);

        if (!id) {
          setIsLoading(false);
          return;
        }

        const { data } = await axios.get(`/products/${id}`);
        setProductData({
          ...productData,
          name: data.name,
          price: data.price,
          discount: data.discount,
          category_id: data.category_id,
          category_name: data.category_name,
          description: data.description,
          quantity: data.quantity,
        });
        const img = get(data, 'Pictures[0].url', '');
        setImage(img);
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }

    getData();
    // eslint-disable-next-line
  }, []);

  const handleFormData = (e, category) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (category) {
      const text = e.target.children[e.target.selectedIndex].textContent;
      setProductData({ ...productData, [name]: value, category_name: text });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (productData.name.length < 3 || productData.name.length > 50) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 50 caracteres');
      document.getElementById('name').style.border = '1px solid #ff0000';
    }

    const price = parseFloat(productData.price);
    if (price !== 0 && !price) {
      formErrors = true;
      toast.error('Valor inválido');
      document.getElementById('price').style.border = '1px solid #ff0000';
    }

    if (productData.old_price && !parseFloat(productData.old_price)) {
      formErrors = true;
      toast.error('Valor sem desconto inválido');
      document.getElementById('oldPrice').style.border = '1px solid #ff0000';
    }

    if (productData.quantity < 1) {
      formErrors = true;
      toast.error('Quantidade não pode ser menor que 1');
      document.getElementById('quantity').style.border = '1px solid #ff0000';
    }

    if (productData.discount && productData.discount < 0) {
      formErrors = true;
      toast.error('Desconto inválido');
      document.getElementById('discount').style.border = '1px solid #ff0000';
    }

    if (!productData.category_id) {
      formErrors = true;
      toast.error('Categoria não selecionada');
      document.getElementById('categoryId').style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    setIsLoading(true);
    try {
      if (id) {
        await axios.put(`/products/${productData.id}`, productData);
        toast.success('Editado com sucesso!');
      } else {
        const { data } = await axios.post(`/products/`, productData);
        setProductData({ ...productData, id: data.id });
        history.push(`/adm/edit-products/${data.id}`);
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
        <title>{newProduct ? 'Novo Produto' : productData.name} | Administrador | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Container>
          <Loading isLoading={isLoading} />
          <form onSubmit={handleSubmit}>
            <h2>{newProduct ? 'Novo Produto' : 'Editar Produto'}</h2>
            {!newProduct && (
              <Picture>
                {image ? <img src={image} alt={image} /> : <img src={`${api_url}/images/no-image.jpg`} alt="image" />}

                <Link className="icon" to={`/adm/edit-image/${id}`} title={'Editar fotos'}>
                  <FaEdit size={24} />
                </Link>
              </Picture>
            )}
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
                value={productData.name}
                onChange={(e) => handleFormData(e)}
                placeholder="Nome"
                itle="Campo Obrigatório"
              />
            </label>
            <label htmlFor="description" title="Campo Obrigatório">
              Descrição:
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={(e) => handleFormData(e)}
                placeholder="Descrição ..."
              />
            </label>
            <label htmlFor="price">
              *Valor:
              <CurrencyInput
                type="text"
                id="price"
                name="price"
                value={productData.price}
                onChange={(e) => handleFormData(e)}
                placeholder="R$ 39.90"
                title="Campo Obrigatório"
              />
            </label>
            <label htmlFor="discount">
              Desconto:
              <input
                id="discount"
                name="discount"
                type="number"
                value={productData.discount}
                onChange={(e) => handleFormData(e)}
                placeholder="10"
              />
            </label>
            <label htmlFor="oldPrice">
              Valor sem desconto:
              <CurrencyInput
                type="text"
                id="oldPrice"
                name="old_price"
                value={productData.old_price}
                onChange={(e) => handleFormData(e)}
                placeholder="R$ 39.90"
              />
            </label>
            <label htmlFor="quantity">
              *Quantidade:
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={productData.quantity}
                onChange={(e) => handleFormData(e)}
                title="Campo Obrigatório"
              />
            </label>
            <label htmlFor="categoryId">
              Categoria:
              <select
                id="categoryId"
                name="category_id"
                value={productData.category_id}
                onChange={(e) => handleFormData(e, true)}
              >
                {categories.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">{newProduct ? 'Criar Produto' : 'Salvar'}</button>
          </form>
        </Container>
      </MainContainer>
    </>
  );
}

AdmEditProduct.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
