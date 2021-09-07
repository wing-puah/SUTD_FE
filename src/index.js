import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './domains/auth';
import { LoginPage } from './pages/login';

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
        <main className="bg-gray-50 p-6 sm:p-12 min-h-screen">
          <Switch>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </main>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
