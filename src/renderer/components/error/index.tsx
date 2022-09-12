import React from 'react';
import { getErrorDescription } from '../../handleError';

interface IProps {
  error: Error;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const Error: React.FC<IProps> = ({ error, reload, setReload }) => {
  const errorDescription = getErrorDescription(error);

  const retry = () => {
    setReload(!reload);
  };

  return (
    <>
      <p>Failed to load videos: {error.message}</p>
      <p>{errorDescription}</p>
      <button onClick={retry}>Retry</button>
    </>
  );
};

export default Error;
