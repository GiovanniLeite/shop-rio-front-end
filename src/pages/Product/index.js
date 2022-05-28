import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { RiHeart3Fill, RiShoppingCart2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import api_url from '../../config/api';
import useHandleError from '../../utils/useHandleError';

import MainContainer from '../../components/MainContainer';
import EmblaCarousel from '../../components/EmblaCarousel/EmblaCarousel';
import { Container } from './styled';
import Loading from '../../components/Loading';

export default function Product({ match, history }) {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const handleError = useHandleError();

  const id = get(match, 'params.id', '');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([
    {
      url: `${api_url}/images/no-image.jpg`,
      filename: 'no-image.jpg',
    },
  ]);

  const media = images.map((image) => image.url);
  const mediaByIndex = (index) => media[index % media.length];
  const SLIDE_COUNT = media.length > 5 ? media.length : 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/products/${id}`);
        if (!data) {
          toast.error('Produto não encontrado');
          history.push('/home');
          return;
        }
        setProduct(data);
        data.Pictures.length && setImages(data.Pictures);
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }

    getData();
    // eslint-disable-next-line
  }, []);

  const handleQuantity = (button) => {
    const remainingAmount = product.quantity;

    if (button === '+') {
      remainingAmount > quantity && setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handleCart = async () => {
    if (!isLoggedIn) {
      toast.warning('Necessário login');
      return;
    }

    if (user.adm !== 0) {
      toast.error('Erro: conta de Administrador');
      return;
    }

    if (user.open_cart !== 1) {
      toast.error('Carrinho fechado');
      return;
    }

    if (product.quantity < 1) {
      toast.warning('Produto fora de estoque');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get(`/products/${product.id}`); // table product
      // checks the amount every time you click the button
      if (data.quantity < quantity) {
        toast.warning('Produto fora de estoque');
        return;
      } else {
        // check duplication in cart
        const currentCart = await axios.get(`/carts/user/${user.id}&${user.current_cart_code}`); // table cart
        const duplicate = currentCart.data.filter((e) => e.product_id === product.id);

        await axios.put(`/products/${product.id}`, { quantity: data.quantity - quantity });

        if (duplicate.length > 0) {
          await axios.put(`/carts/${duplicate[0].id}`, { quantity: duplicate[0].quantity + quantity });
        } else {
          await axios.post(`/carts/`, {
            user_id: user.id,
            product_id: product.id,
            product_img: product.Pictures.length ? product.Pictures[0].file_name : `no-image.jpg`,
            product_name: product.name,
            quantity,
            price: product.price,
            cart_code: user.current_cart_code,
          });
        }
        toast.success(`${quantity} ${product.name.slice(0, 10)} adicionado(s) ao carrinho`);
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  const handleWish = async () => {
    if (!isLoggedIn) {
      toast.warning('Necessário login');
      return;
    }

    if (user.adm !== 0) {
      toast.error('Erro: conta de Administrador');
      return;
    }

    setIsLoading(true);
    try {
      const currentCart = await axios.get(`/wishlists/user/${user.id}`);
      const duplicate = currentCart.data.filter((e) => e.user_id === user.id && e.product_id === product.id);

      if (duplicate.length === 0) {
        await axios.post(`/wishlists/`, {
          user_id: user.id,
          product_id: product.id,
          product_img: product.Pictures.length ? product.Pictures[0].file_name : `no-image.jpg`,
          product_name: product.name,
        });
      }
      toast.success(`${product.name.slice(0, 10)} adicionado a lista de desejos`);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>{get(product, 'name', '')} | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Loading isLoading={isLoading} />
        {get(product, 'name', false) && (
          <Container>
            <Link
              to={`/categoriy/${product.category_id}/Arrumar`}
              title={`Ir para ${product.category_name.slice(0, 6)}...`}
            >
              {product.category_name}
            </Link>
            <div className="mainInfo">
              <div className="images">
                <h3>{product.name}</h3>
                <EmblaCarousel slides={slides} mediaByIndex={mediaByIndex} className="embla-div" />
              </div>
              <div className="info">
                <div className="title">
                  <h3>{product.name}</h3>
                  <h4>{product.description.slice(0, 60)}</h4>
                  {product.old_price && <p>R$ {product.old_price}</p>}
                  <h2>R$ {product.price}</h2>
                </div>
                <div>
                  <div>
                    <button onClick={() => handleQuantity('-')}>-</button>
                    <input type="text" value={`${quantity} un.`} disabled />
                    <button onClick={() => handleQuantity('+')}>+</button>
                  </div>
                  <button
                    className="cart"
                    title="Adicionar ao Carrinho"
                    onClick={() => {
                      handleCart();
                    }}
                  >
                    {product.quantity < 1 ? 'Sem estoque' : 'ADICIONAR'} <RiShoppingCart2Fill />
                  </button>
                  <button
                    className="wish"
                    title="Adicionar a lista de Desejos"
                    onClick={() => {
                      handleWish();
                    }}
                  >
                    DESEJOS <RiHeart3Fill />
                  </button>
                </div>
              </div>
            </div>
            <div className="description">
              <h3>Descrição</h3>
              <p>{product.description}</p>
            </div>
          </Container>
        )}
      </MainContainer>
    </>
  );
}
Product.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
