'use client';

import { useSignin } from '@/hoooks/use-signin';
import React from 'react';
import AuthForm from './auth-form';

const SignInForm = () => {
  const { handleSubmit } = useSignin();

  return (
    <>
      <AuthForm handleSubmit={handleSubmit} />
    </>
  );
};

export default SignInForm;
