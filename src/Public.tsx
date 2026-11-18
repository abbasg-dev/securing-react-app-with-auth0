import { useEffect, useState } from 'react';
import { api } from './api/interceptor';

const Public = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api<{ message: string }>('/api/public')
      .then(({ message }) => setMessage(message))
      .catch(({ message }) => setMessage(message));
  }, []);

  return <p>{message}</p>;
};

export default Public;
