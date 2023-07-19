import { useState } from 'react';
import { ErrorContainer, Message } from './styles';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessageLogin({ message }: ErrorMessageProps) {
  const [showError, setShowError] = useState(false);

  const handleLoginError = () => {
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  if (!showError) {
    return null; // Não renderiza nada se não houver erro
  }

  return (
    <ErrorContainer className="error-message">
      <Message>{message}</Message>
    </ErrorContainer>
  );
}
