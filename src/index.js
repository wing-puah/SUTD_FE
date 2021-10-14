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
import { MoviesPage } from './pages/movies';
import { SingleMoviePage } from './pages/singleMovie';

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
              <MoviesPage />
            </Route>
            <Route path="/movie/:movieId">
              <SingleMoviePage />
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
