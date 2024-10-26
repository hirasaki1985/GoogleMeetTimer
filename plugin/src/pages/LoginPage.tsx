import React, { useCallback } from 'react';
import { Button } from '@/components/Button';
import { useAuthContext } from '@/features/auth/context/AuthContext';

export const LoginPage = () => {
  const { authAction } = useAuthContext();

  const onClickLogin = useCallback(() => {
    authAction.googleLogin();
  }, [authAction]);

  return (
    <div>
      <Button label={'Googleアカウントでログイン'} onClick={onClickLogin} />
    </div>
  );
};
