import React from 'react';
import ReactDOM from 'react-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './domains/auth';
import { LoginPage } from './pages/login';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
