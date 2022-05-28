import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillPrinter } from 'react-icons/ai';
import { FaTruck, FaBoxes } from 'react-icons/fa';

import axios from '../../../services/axios';
import useHandleError from '../../../utils/useHandleError';
import { generateSingleOrderReport } from '../../../utils/generateSingleOrderReport';
import generateCartCode from '../../../utils/generateCartCode';
import { getDate } from '../../../utils/getDate';

import { Container } from './styled';
import Loading from '../../../components/Loading';

// delivered === 0 - Pedido Recebido
// delivered === 1 - Pedido Entregue
// delivered === 2 - Pedido Em Rota
export default function Pending() {
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(true);

  const [pendingOrders, setPendingOrders] = useState([]);
  const [refresh, setRefresh] = useState('refresh');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/orders/all/${0}`);
        setPendingOrders(data);
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }
    getData();
    // eslint-disable-next-line
  }, [refresh]);

  const handleReport = async (order) => {
    setIsLoading(true);
    try {
      const cart = await axios.get(`/carts/user/${order.user_id}&${order.cart_code}`);
      const customer = await axios.get(`/users/${order.user_id}`);
      generateSingleOrderReport(order, cart.data, customer.data);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  const handleSendAndReport = async (order) => {
    if (order.delivered === 2) {
      toast.warning('Já esta em rota');
      return;
    }

    setIsLoading(true);
    try {
      const date = getDate();
      await axios.put(`/orders/${order.id}`, { name: `${order.name}-Em Rota`, delivered: 2 });

      await axios.post(`/notifications/`, {
        user_id: order.user_id,
        content: `Pedido em rota ${date}`,
        read: 0,
      });

      setRefresh(order.name);

      handleReport(order);

      toast.success(`${order.name.slice(0, 20)}... Em Rota`);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  const handleDelivered = async (order, index) => {
    setIsLoading(true);
    try {
      const date = getDate();
      const newCartCode = generateCartCode('b');
      const a = await axios.put(`/users/adm/${order.user_id}&${true}`, {
        open_cart: 1,
        current_cart_code: newCartCode,
      });

      await axios.put(`/orders/${order.id}`, { name: `${order.name}-Entregue`, delivered: 1 });
      await axios.post(`/notifications/`, {
        user_id: order.user_id,
        content: `Pedido entregue ${date}`,
        read: 0,
      });

      // remove li
      const newPendingOrders = [...pendingOrders];
      newPendingOrders.splice(index, 1);
      setPendingOrders(newPendingOrders);
      toast.success(`${order.name.slice(0, 20)}... Entregue`);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <ul>
        {pendingOrders.map((order, index) => (
          <li key={order.id}>
            <span>{order.name}</span>
            <div>
              <button
                title="Apenas gerar relatório"
                onClick={() => {
                  handleReport(order, index);
                }}
              >
                <AiFillPrinter />
              </button>
              {order.delivered !== 2 && (
                <button
                  title="Sinalizar como em rota e gerar relatório"
                  onClick={() => {
                    handleSendAndReport(order, index);
                  }}
                >
                  <FaTruck />
                </button>
              )}
              <button
                title="Sinalizar como entregue"
                onClick={() => {
                  handleDelivered(order, index);
                }}
              >
                <FaBoxes />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
