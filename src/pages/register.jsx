import { LoginForm } from 'domains/auth';
import * as React from 'react';

export const RegisterPage = () => {
  return (
    <div className="bg-gray-50 p-6 sm:p-12 min-h-screen">
      <LoginForm />
    </div>
  );
};
