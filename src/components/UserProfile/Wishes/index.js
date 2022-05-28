import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import axios from '../../../services/axios';
import useHandleError from '../../../utils/useHandleError';
import api_url from '../../../config/api';

import { Container } from './styled';
import Loading from '../../Loading';

export default function Wishes({ userId }) {
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(true);

  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/wishlists/user/${userId}`);
        setWishes(data);
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }
    getData();
    // eslint-disable-next-line
  }, []);

  const handleWish = async (e, wishId, index) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const { data } = await axios.delete(`/wishlists/${wishId}`);
      if (get(data, 'deleted', false)) {
        const newWishes = [...wishes];
        newWishes.splice(index, 1);
        setWishes(newWishes);
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <ul id="ulWishlist">
        {wishes.map((wish, index) => (
          <li key={wish.id} id={`li${wish.id}`}>
            <Link to={`/product/${wish.product_id}`} title={wish.product_name}>
              <img src={`${api_url}/images/${wish.product_img}`} />
              {wish.product_name}
            </Link>
            <span>
              <a onClick={(e) => handleWish(e, wish.id, index)} title="Excluir desejo">
                <AiOutlineCloseSquare />
              </a>
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

Wishes.propTypes = {
  userId: PropTypes.number.isRequired,
};
