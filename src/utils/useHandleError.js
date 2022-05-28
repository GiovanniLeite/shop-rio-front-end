import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import * as actions from '../store/modules/auth/actions';

const useHandleError = (error) => {
  const dispatch = useDispatch();

  const status = get(error, 'response.status', 0);
  const data = get(error, 'response.data', {});
  const errors = get(data, 'errors', []);

  return () => {
    if (errors.length > 0) {
      errors.map((er) => toast.error(er));
    } else {
      toast.error('Erro desconhecido');
    }

    if (status === 401) dispatch(actions.loginFailure());
  };
};

export default useHandleError;
