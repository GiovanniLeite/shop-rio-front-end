import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DialogActions, useMediaQuery } from '@mui/material';
import { AiOutlineCloseSquare, AiFillEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { get } from 'lodash';

import axios from '../../../services/axios';
import * as actions from '../../../store/modules/auth/actions';
import useHandleError from '../../../utils/useHandleError';
import { getDate } from '../../../utils/getDate';
import api_url from '../../../config/api';

import { Container, DialogZ } from './styled';
import Loading from '../../Loading';

export default function Cart() {
  const dispatch = useDispatch();
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const mediumViewport = useMediaQuery('(min-width:500px)');

  const user = useSelector((state) => state.auth.user);

  const [order, setOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  // edit item window
  const [currentItem, setCurrentItem] = useState({ item: {}, index: '' }); // from table cart
  const [originItem, setOriginItem] = useState({}); // from table products
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/carts/user/${user.id}&${user.current_cart_code}`);
        if (data) {
          let price = 0;
          data.forEach((e) => (price = price + parseFloat(e.price) * e.quantity));
          setEstimatedTotal(price.toFixed(2));
        }
        setCart(data);

        setOpenCart(user.open_cart);
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }
    getData();
    // eslint-disable-next-line
  }, []);

  const handleCloseCart = async () => {
    if (cart.length < 1) {
      toast.warning('Nenhum item no carrinho');
      return;
    }

    if (user.Addresses.length < 1) {
      toast.warning('Necessário endereço para finalizar compra');
      return;
    }

    setIsLoading(true);
    try {
      setOpenCart(0);
      const date = getDate();

      const { data } = await axios.post(`/orders/`, {
        user_id: user.id,
        name: `Pedido:Cli:${user.id} ${date}`,
        total: estimatedTotal,
        cart_code: user.current_cart_code,
        delivered: 0,
      });
      if (data) {
        setOrder(data);
        await axios.post(`/notifications/`, {
          user_id: user.id,
          content: `Pedido recebido ${date}`,
          read: 0,
        });
      }
      dispatch(actions.registerRequest({ ...user, open_cart: 0, updateType: 4 }));
      toast.success('Pedido recebido!');
    } catch (err) {
      setOpenCart(1);
      setOrder(false);

      handleError(err);
    }
    setIsLoading(false);
  };

  const handleOpenCart = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/orders/user/${user.id}`);
      if (response.data.length === 0) {
        toast.error('Erro: pedido não encontrado');
        setIsLoading(false);
        return;
      }

      if (response.data.delivered !== 0) {
        toast.error('Erro: Pedidos em Rota não podem ser cancelados!');
        setIsLoading(false);
        return;
      }

      const { data } = await axios.delete(`/orders/${order.id}`);
      if (get(data, 'deleted', false)) {
        await axios.post(`/notifications/`, {
          user_id: user.id,
          content: `Pedido cancelado!`,
          read: 0,
        });

        dispatch(actions.registerRequest({ ...user, open_cart: 1, updateType: 4 }));
        toast.success(`Pedido:Cli:${user.id} cancelado, carrinho reaberto`);
        setOrder(false);
        setOpenCart(1);
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  const handleRemoveItem = async (cartId, index, productId, quantityUpdate) => {
    setIsLoading(true);
    try {
      // update quantity in product table
      const product = await axios.get(`/products/${productId}`); // table product
      await axios.put(`/products/${productId}`, { quantity: parseInt(product.data.quantity) + quantityUpdate });

      // remove cart item
      const { data } = await axios.delete(`/carts/${cartId}`); // table cart
      if (get(data, 'deleted', false)) {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);

        let price = 0;
        newCart.forEach((e) => (price = price + parseFloat(e.price) * e.quantity));
        setEstimatedTotal(price.toFixed(2));
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  /* START EDIT WINDOW */
  // open edit window
  const handleEditItem = async (e, cartItem, index) => {
    e.preventDefault();
    if (openCart != 1) return;

    setIsLoading(true);
    try {
      /*LOADING HERE */
      const { data } = await axios.get(`/products/${cartItem.product_id}`);
      setOriginItem(data); // item from table products
      setCurrentItem({ item: cartItem, index }); // item from table cart
      setQuantity(cartItem.quantity);
      setOpen(true);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  // edit the quantity of that item
  const handleQuantity = (button) => {
    const remainingAmount = originItem.quantity;

    if (button === '+') {
      remainingAmount > quantity && setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  // update table cart
  const handleUpdateItem = async () => {
    setIsLoading(true);
    try {
      if (currentItem.item.quantity === quantity) {
        setIsLoading(false);
        return;
      }

      // product table
      const product = await axios.get(`/products/${originItem.id}`); // table product

      if (currentItem.item.quantity < quantity && parseInt(product.data.quantity) >= quantity) {
        // adding cart items
        // update quantity in product table
        await axios.put(`/products/${product.data.id}`, {
          quantity: parseInt(product.data.quantity) - (quantity - currentItem.item.quantity),
        });
      } else if (currentItem.item.quantity > quantity) {
        // decreasing cart items
        // update quantity in product table
        await axios.put(`/products/${product.data.id}`, {
          quantity: parseInt(product.data.quantity) + (currentItem.item.quantity - quantity),
        });
      }

      // update cart item
      await axios.put(`/carts/${currentItem.item.id}`, { quantity: quantity });

      // update cart array
      const newCart = [...cart];
      newCart[currentItem.index].quantity = quantity;

      // update
      let price = 0;
      newCart.forEach((e) => (price = price + parseFloat(e.price) * e.quantity));

      setEstimatedTotal(price.toFixed(2));
      setCart(newCart);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };
  /* END EDIT WINDOW */

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container>
        <ul className="title">
          <li className="liImg">Item</li>
          <li>Nome</li>
          <li>Qnt.</li>
          <li>R$</li>
          <li> </li>
          <li> </li>
        </ul>
        <div className="content">
          {cart.map((cartItem, index) => (
            <ul key={cartItem.id} title={cartItem.product_name}>
              <li className="liImg">
                <img src={`${api_url}/images/${cartItem.product_img}`} />
              </li>
              <li className="titleName">
                {mediumViewport ? cartItem.product_name : cartItem.product_name.slice(0, 8)}
              </li>
              <li>{cartItem.quantity}</li>
              <li>{cartItem.price}</li>
              <li>
                <a
                  title="Editar item"
                  className={openCart === 1 ? '' : 'disabled'}
                  onClick={(e) => {
                    handleEditItem(e, cartItem, index);
                  }}
                >
                  <AiFillEdit />
                </a>
              </li>
              <li>
                <a
                  title="Remover item"
                  className={openCart === 1 ? '' : 'disabled'}
                  onClick={(e) => {
                    e.preventDefault();
                    openCart === 1 && handleRemoveItem(cartItem.id, index, cartItem.product_id, cartItem.quantity);
                  }}
                >
                  <AiOutlineCloseSquare />
                </a>
              </li>
            </ul>
          ))}
        </div>
        <ul className="amount">
          <li>
            <strong>Total R$ {estimatedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
          </li>
        </ul>
        {openCart === 1 && (
          <button
            onClick={() => {
              handleCloseCart();
            }}
          >
            Finalizar Compra
          </button>
        )}
        {openCart != 1 && cart.length > 0 && (
          <button
            onClick={() => {
              handleOpenCart();
            }}
          >
            Reabrir Carrinho
          </button>
        )}
      </Container>
      <DialogZ
        open={open}
        onClose={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <h3>{currentItem.item.product_name}</h3>
        <span />
        <img src={`${api_url}/images/${currentItem.item.product_img}`} />
        <p>{currentItem.item.price}</p>
        <DialogActions>
          <div className="unitPlus">
            <button title="- 1 unidade" onClick={() => handleQuantity('-')}>
              -
            </button>
            <input type="text" value={`${quantity} un.`} disabled />
            <button title="+ 1 unidade" onClick={() => handleQuantity('+')}>
              +
            </button>
          </div>
          <div className="sideButton">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                handleUpdateItem();
              }}
              title="Confirmar"
            >
              Confirmar <AiOutlineCheck />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              title="Cancelar"
            >
              Cacelar <AiOutlineClose />
            </button>
          </div>
        </DialogActions>
      </DialogZ>
    </>
  );
}
