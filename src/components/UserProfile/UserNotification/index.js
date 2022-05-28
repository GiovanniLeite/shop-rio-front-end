import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCloseSquare } from 'react-icons/ai';

import axios from '../../../services/axios';
import useHandleError from '../../../utils/useHandleError';

import { Container } from './styled';
import Loading from '../../Loading';

export default function UserNotification({ userId }) {
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/notifications/user/${userId}`);
        setNotifications(data);
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }
    getData();
    // eslint-disable-next-line
  }, []);

  const handleNotification = async (e, notificationId, index) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await axios.put(`/notifications/${notificationId}`, { read: 1 });

      const newNotification = [...notifications];
      newNotification.splice(index, 1);
      setNotifications(newNotification);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <ul>
        {notifications.map((notification, index) => (
          <li key={notification.id}>
            {notification.content}
            <span>
              <a onClick={(e) => handleNotification(e, notification.id, index)} title="Excluir notificação">
                <AiOutlineCloseSquare />
              </a>
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

UserNotification.propTypes = {
  userId: PropTypes.number.isRequired,
};
