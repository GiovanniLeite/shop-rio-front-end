import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiCaretRight } from 'react-icons/bi';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import axios from '../../../services/axios';
import useHandleError from '../../../utils/useHandleError';
import api_url from '../../../config/api';

import { Container } from './styled';
import Loading from '../../Loading';

export default function Offers({ products }) {
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleCart = async (productId, productImg, productName, price, remainingAmount) => {
    if (!isLoggedIn) {
      toast.warning('Necessário login');
      return;
    }

    if (user.adm !== 0) {
      toast.error('Erro conta de Administrador');
      return;
    }

    if (user.open_cart !== 1) {
      toast.error('Carrinho fechado');
      return;
    }

    if (remainingAmount < 1) {
      toast.warning('Produto fora de estoque');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get(`/products/${productId}`); // table product
      // checks the amount every time you click the button
      if (data.quantity < 1) {
        toast.warning('Produto fora de estoque');
        return;
      } else {
        // check duplication in cart
        const currentCart = await axios.get(`/carts/user/${user.id}&${user.current_cart_code}`); // table cart
        const duplicate = currentCart.data.filter((e) => e.product_id === productId);

        await axios.put(`/products/${productId}`, { quantity: data.quantity - 1 });

        if (duplicate.length > 0) {
          await axios.put(`/carts/${duplicate[0].id}`, { quantity: duplicate[0].quantity + 1 });
        } else {
          await axios.post(`/carts/`, {
            user_id: user.id,
            product_id: productId,
            product_img: productImg,
            product_name: productName,
            quantity: 1,
            price,
            cart_code: user.current_cart_code,
          });
        }
        toast.success(`${productName.slice(0, 10)} adicionado ao carrinho`);
      }
    } catch (err) {
      handleError(err);
    }

    setIsLoading(false);
  };

  // 11 - Ofertas
  // 8-Mercearia e Alimentos
  // 10-Hortifruti
  // 9-Frios e Laticínios
  // 6-Limpeza
  // 7-Higiene e Beleza
  // 2-Bebidas
  // 4-Doces e Sobremesas
  // 1-Açougue
  return (
    <Container>
      <Loading isLoading={isLoading} />
      {products[8].length > 0 && (
        <>
          <div className="titleOffers emphasis">
            OFERTAS
            <Link
              to={{
                pathname: '/category/11',
                state: { name: 'Ofertas' },
              }}
              title="Veja mais em Ofertas"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[8].map(
              (e, index) =>
                index < 6 && (
                  <div className="card" key={e.id}>
                    <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                    <Link to={`/product/${e.id}`} title={e.name}>
                      <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                      <h3>{e.name.slice(0, 45)}</h3>
                    </Link>
                    <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                    <h2>R$ {e.price}</h2>
                    <button
                      onClick={() => {
                        handleCart(
                          e.id,
                          e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                          e.name,
                          e.price,
                          e.quantity,
                        );
                      }}
                      title="Adicionar ao Carrino"
                    >
                      {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                    </button>
                  </div>
                ),
            )}
          </div>
        </>
      )}
      {products[0].length > 0 && (
        <>
          <div className="titleOffers">
            Mercearia e Alimentos
            <Link
              to={{
                pathname: '/category/8',
                state: { name: 'Mercearia e Alimentos' },
              }}
              title="Veja mais em Mercearia e Alimentos"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[0].map((e) => (
              <div className="card" key={e.id}>
                <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                <Link to={`/product/${e.id}`} title={e.name}>
                  <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                  <h3>{e.name.slice(0, 45)}</h3>
                </Link>
                <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                <h2>R$ {e.price}</h2>
                <button
                  onClick={() => {
                    handleCart(
                      e.id,
                      e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                      e.name,
                      e.price,
                      e.quantity,
                    );
                  }}
                  title="Adicionar ao Carrino"
                >
                  {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {products[1].length > 0 && (
        <>
          <div className="titleOffers">
            Hortifruti
            <Link
              to={{
                pathname: '/category/10',
                state: { name: 'Hortifruti' },
              }}
              title="Veja mais em Hortifruti"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[1].map((e) => (
              <div className="card" key={e.id}>
                <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                <Link to={`/product/${e.id}`} title={e.name}>
                  <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                  <h3>{e.name.slice(0, 45)}</h3>
                </Link>
                <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                <h2>R$ {e.price}</h2>
                <button
                  onClick={() => {
                    handleCart(
                      e.id,
                      e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                      e.name,
                      e.price,
                      e.quantity,
                    );
                  }}
                  title="Adicionar ao Carrino"
                >
                  {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {products[2].length > 0 && (
        <>
          <div className="titleOffers">
            Frios e Laticínios
            <Link
              to={{
                pathname: '/category/9',
                state: { name: 'Frios e Laticínios' },
              }}
              title="Veja mais em Frios e Laticínios"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[2].map((e) => (
              <div className="card" key={e.id}>
                <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                <Link to={`/product/${e.id}`} title={e.name}>
                  <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                  <h3>{e.name.slice(0, 45)}</h3>
                </Link>
                <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                <h2>R$ {e.price}</h2>
                <button
                  onClick={() => {
                    handleCart(
                      e.id,
                      e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                      e.name,
                      e.price,
                      e.quantity,
                    );
                  }}
                  title="Adicionar ao Carrino"
                >
                  {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {products[3].length > 0 && (
        <>
          <div className="titleOffers">
            Limpeza
            <Link
              to={{
                pathname: '/category/6',
                state: { name: 'Limpeza' },
              }}
              title="Veja mais em Limpeza"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[3].map((e) => (
              <div className="card" key={e.id}>
                <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                <Link to={`/product/${e.id}`} title={e.name}>
                  <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                  <h3>{e.name.slice(0, 45)}</h3>
                </Link>
                <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                <h2>R$ {e.price}</h2>
                <button
                  onClick={() => {
                    handleCart(
                      e.id,
                      e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                      e.name,
                      e.price,
                      e.quantity,
                    );
                  }}
                  title="Adicionar ao Carrino"
                >
                  {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {products[4].length > 0 && (
        <>
          <div className="titleOffers">
            Higiene e Beleza
            <Link
              to={{
                pathname: '/category/7',
                state: { name: 'Higiene e Beleza' },
              }}
              title="Veja mais em Higiene e Beleza"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[4].map((e) => (
              <div className="card" key={e.id}>
                <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                <Link to={`/product/${e.id}`} title={e.name}>
                  <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                  <h3>{e.name.slice(0, 45)}</h3>
                </Link>
                <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                <h2>R$ {e.price}</h2>
                <button
                  onClick={() => {
                    handleCart(
                      e.id,
                      e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                      e.name,
                      e.price,
                      e.quantity,
                    );
                  }}
                  title="Adicionar ao Carrino"
                >
                  {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {products[5].length > 0 && (
        <>
          <div className="titleOffers">
            Bebidas
            <Link
              to={{
                pathname: '/category/2',
                state: { name: 'Bebidas' },
              }}
              title="Veja mais em Bebidas"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[5].map((e) => (
              <div className="card" key={e.id}>
                <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                <Link to={`/product/${e.id}`} title={e.name}>
                  <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                  <h3>{e.name.slice(0, 45)}</h3>
                </Link>
                <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                <h2>R$ {e.price}</h2>
                <button
                  onClick={() => {
                    handleCart(
                      e.id,
                      e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                      e.name,
                      e.price,
                      e.quantity,
                    );
                  }}
                  title="Adicionar ao Carrino"
                >
                  {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {products[6].length > 0 && (
        <>
          <div className="titleOffers">
            Doces e Sobremesas
            <Link
              to={{
                pathname: '/category/4',
                state: { name: 'Doces e Sobremesas' },
              }}
              title="Veja mais em Docces e Sobemesas"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[6].map((e) => (
              <div className="card" key={e.id}>
                <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                <Link to={`/product/${e.id}`} title={e.name}>
                  <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                  <h3>{e.name.slice(0, 45)}</h3>
                </Link>
                <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                <h2>R$ {e.price}</h2>
                <button
                  onClick={() => {
                    handleCart(
                      e.id,
                      e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                      e.name,
                      e.price,
                      e.quantity,
                    );
                  }}
                  title="Adicionar ao Carrino"
                >
                  {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {products[7].length > 0 && (
        <>
          <div className="titleOffers">
            Açougue
            <Link
              to={{
                pathname: '/category/1',
                state: { name: 'Açougue' },
              }}
              title="Veja mais em Açougue"
            >
              Veja Mais
              <BiCaretRight />
            </Link>
          </div>
          <div className="offers">
            {products[7].map((e) => (
              <div className="card" key={e.id}>
                <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                <Link to={`/product/${e.id}`} title={e.name}>
                  <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                  <h3>{e.name.slice(0, 45)}</h3>
                </Link>
                <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                <h2>R$ {e.price}</h2>
                <button
                  onClick={() => {
                    handleCart(
                      e.id,
                      e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                      e.name,
                      e.price,
                      e.quantity,
                    );
                  }}
                  title="Adicionar ao Carrino"
                >
                  {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

Offers.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
};
