import * as React from 'react';
import { fetchJson } from 'lib/fetch-json';
import { BASE_URL } from 'appConstants';

const ACCESS_TOKEN_STORAGE = 'auth';
const USER_ID_STORAGE = 'userId';
const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE);
const userIdToken = localStorage.getItem(USER_ID_STORAGE);

const AUTH_DEFAULT_STATE = storedAccessToken
  ? {
      status: 'authenticated',
      accessToken: storedAccessToken,
      user: userIdToken,
    }
  : {
      status: 'anonymous',
      accessToken: null,
      user: null,
    };

const AuthContext = React.createContext();

const authReducer = (state, event) => {
  switch (event.type) {
    case 'login':
      return {
        accessToken: event.accessToken,
        status: 'authenticated',
      };

    case 'logout':
      return {
        accessToken: null,
        status: 'anonymous',
      };

    case 'setUser':
      return {
        ...state,
        user: event.user,
      };

    default:
      throw new Error(`Unsupported event type ${event.type} in authReducer`);
  }
};

export const useAuthState = () => {
  const [state, dispatch] = React.useReducer(authReducer, AUTH_DEFAULT_STATE);

  const login = (accessToken) =>
    dispatch({
      type: 'login',
      accessToken,
    });

  const logout = () =>
    dispatch({
      type: 'logout',
    });

  const setUser = (user) => dispatch({ type: 'setUser', user });

  return {
    ...state,
    login,
    logout,
    setUser,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthState();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error('Your application must be wrapped with AuthProvider');
  }

  return auth;
};

const login = (email, password) =>
  fetchJson(`${BASE_URL}/login`, {
    method: 'POST',
    body: {
      username: email,
      password,
    },
  });

const register = ({ name, email, password }) =>
  fetchJson(`${BASE_URL}/register`, {
    method: 'POST',
    body: {
      name,
      email,
      password,
      avatar: 'http://github.com/malcolm-kee.png',
    },
  });

const getUserId = (token) =>
  fetchJson(`${BASE_URL}/whoami`, { headers: { Authorization: `Bearer ${token}` } });

export const useRegister = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error('Your application must be wrapped with AuthProvider');
  }

  return register;
};

export const useLogin = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error('Your application must be wrapped with AuthProvider');
  }

  return function invokeLogin({ email, password }) {
    return login(email, password).then(async (res) => {
      auth.login(res.access_token);
      await localStorage.setItem(ACCESS_TOKEN_STORAGE, res.access_token);

      getUserId(res.access_token).then((res) => {
        const user = (res && res.userId) || null;
        auth.setUser(user);
        localStorage.setItem(USER_ID_STORAGE, user);
      });

      return res;
    });
  };
};

export const useLogout = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error('Your application must be wrapped with AuthProvider');
  }

  return () => {
    auth.logout();
    localStorage.removeItem(USER_ID_STORAGE);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE);
  };
};
