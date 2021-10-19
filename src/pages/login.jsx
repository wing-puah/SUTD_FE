import { LoginForm } from 'domains/auth';
import * as React from 'react';

export const LoginPage = () => {
  return (
    <div className="p-6 sm:p-12 min-h-screen">
      <LoginForm />
    </div>
  );
};
