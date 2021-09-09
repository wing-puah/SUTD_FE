import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './domains/auth';
import { LoginPage } from './pages/login';
import { Marketplace } from './pages/marketplace';

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
        <main>
          <Switch>
            <Route path="/" exact>
              <LoginPage />
            </Route>
            <Route path="/marketplace">
              <Marketplace />
            </Route>
          </Switch>
        </main>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
