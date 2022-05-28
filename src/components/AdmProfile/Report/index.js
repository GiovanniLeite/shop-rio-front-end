import { useState } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import { toast } from 'react-toastify';

import axios from '../../../services/axios';
import useHandleError from '../../../utils/useHandleError';
import { generateOrderReport } from '../../../utils/generateOrderReport';
import { generateSingleOrderReport } from '../../../utils/generateSingleOrderReport';
import { getDate } from '../../../utils/getDate';

import { Container } from './styled';
import Loading from '../../Loading';

export default function Report() {
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(false);

  const [allOrders, setAllOrders] = useState(false);
  const [perPeriod, setPerPeriod] = useState(false);
  const [orderIdCheck, setOrderIdCheck] = useState(false);
  const [orderId, setOrderId] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [all, setAll] = useState(false);
  const [pendingDelivery, setPendingDelivery] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const handleReport = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!allOrders && !perPeriod && !orderIdCheck) {
      formErrors = true;
      toast.error('Tipo de pedido não selecionado');
    }

    if (perPeriod && (start === false || end === false)) {
      formErrors = true;
      toast.error('Data início e/ou final não selecionadas');
      document.getElementById('start').style.border = '1px solid #ff0000';
      document.getElementById('end').style.border = '1px solid #ff0000';
    }

    if (orderIdCheck && !parseInt(orderId)) {
      formErrors = true;
      toast.error('Código do pedido não informado');
      document.getElementById('orderId').style.border = '1px solid #ff0000';
    }

    if (!orderIdCheck && !all && !pendingDelivery && !delivered) {
      formErrors = true;
      toast.error('Situação não selecionada');
    }

    if (formErrors) return;

    setIsLoading(true);
    try {
      // delivery type
      let deliveryIndicator;
      let type = '';
      if (all) {
        deliveryIndicator = 'any';
        type = 'pendentes e entregues';
      } else if (pendingDelivery) {
        deliveryIndicator = 0;
        type = 'pendentes';
      } else if (delivered) {
        deliveryIndicator = 1;
        type = 'entregues';
      }

      // search type
      if (allOrders) {
        const { data } = await axios.get(`/orders/all/${deliveryIndicator}`);
        generateOrderReport(`Relatório padrão - Pedidos ${type}`, false, data);
      } else if (perPeriod) {
        const { data } = await axios.get(`/orders/date/${start}&${end}&${deliveryIndicator}`);
        const date1 = getDate(start + ' 00:00:00');
        const date2 = getDate(end + ' 00:00:00');
        generateOrderReport(`Relatório por período - Pedidos ${type}`, `${date1} - ${date2}`, data);
      } else if (orderIdCheck) {
        const order = await axios.get(`/orders/${orderId}`);
        const cart = await axios.get(`/carts/user/${order.data.user_id}&${order.data.cart_code}`);
        const customer = await axios.get(`/users/${order.data.user_id}`);
        generateSingleOrderReport(order.data, cart.data, customer.data);
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <form onSubmit={handleReport}>
        <h2>Tipo</h2>
        <div>
          <input
            type="checkbox"
            id="allOrders"
            onChange={() => (allOrders ? setAllOrders(false) : setAllOrders(true))}
            disabled={(orderIdCheck || perPeriod) && true}
          />
          <label htmlFor="allOrders">Todos os Pedidos</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="perPeriod"
            onChange={() => (perPeriod ? setPerPeriod(false) : setPerPeriod(true))}
            disabled={(orderIdCheck || allOrders) && true}
          />
          <label htmlFor="perPeriod">Por período:</label>
        </div>
        <input
          type="date"
          id="start"
          onChange={(e) => setStart(e.target.value)}
          disabled={!perPeriod && true}
          title="Início"
        />
        <input
          type="date"
          id="end"
          onChange={(e) => setEnd(e.target.value)}
          disabled={!perPeriod && true}
          title="Final"
        />
        <div>
          <input
            type="checkbox"
            id="orderIdCheck"
            onChange={() => (orderIdCheck ? setOrderIdCheck(false) : setOrderIdCheck(true))}
            disabled={(allOrders || perPeriod) && true}
          />
          <label htmlFor="orderIdCheck">Por código:</label>
        </div>
        <input type="text" id="orderId" onChange={(e) => setOrderId(e.target.value)} disabled={!orderIdCheck && true} />
        <h2>Situação</h2>
        <div>
          <input
            type="checkbox"
            id="all"
            onChange={() => (all ? setAll(false) : setAll(true))}
            disabled={(orderIdCheck || pendingDelivery || delivered) && true}
          />
          <label htmlFor="all">Todas</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="pendingDelivery"
            onChange={() => (pendingDelivery ? setPendingDelivery(false) : setPendingDelivery(true))}
            disabled={(orderIdCheck || all || delivered) && true}
          />
          <label htmlFor="pendingDelivery">Pendente</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="delivered"
            onChange={() => (delivered ? setDelivered(false) : setDelivered(true))}
            disabled={(orderIdCheck || all || pendingDelivery) && true}
          />
          <label htmlFor="delivered">Entregue</label>
        </div>
        <button type="submit">
          Gerar <AiOutlinePrinter />
        </button>
      </form>
    </Container>
  );
}
