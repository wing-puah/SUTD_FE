import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppShell } from './app-shell';
import { AuthProvider } from './domains/auth';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { Marketplace } from './pages/marketplace';
import { CatsPage } from './pages/cats';
import { SingleCat } from './pages/singleCat';

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
        <AppShell>
          <Switch>
            <Route path="/" exact>
              <CatsPage />
            </Route>
            <Route path="/cats/:catId">
              <SingleCat />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/marketplace">
              <Marketplace />
            </Route>
          </Switch>
        </AppShell>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
