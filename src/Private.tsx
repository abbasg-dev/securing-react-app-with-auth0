import { useEffect, useState } from 'react';
import { api } from './api/interceptor';

const Private = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api<{ message: string }>('/api/private')
      .then(({ message }) => setMessage(message))
      .catch(({ message }) => setMessage(message));
  }, []);

  return <p>{message}</p>;
};

export default Private;
