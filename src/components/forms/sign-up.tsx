'use client';
import React from 'react';
import useSignup from '@/hoooks/use-signup';
import OTPForm from './otp-form';
import AuthForm from './auth-form';

const SignUpForm = () => {
  const { handleSubmit, verifying } = useSignup();

  if (!verifying) {
    return (
      <>
        <AuthForm handleSubmit={handleSubmit} />
      </>
    );
  } else {
    return <OTPForm />;
  }
};

export default SignUpForm;
