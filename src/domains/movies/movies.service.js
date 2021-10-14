import { fetchJson, encodeQueryString } from 'lib/fetch-json';
import { BASE_URL } from 'appConstants';

export const addComment = ({ data, token }) => {
  console.log({ data, token });
  return fetchJson(`${BASE_URL}/movie/comment`, {
    method: 'POST',
    body: {
      ...data,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteComment = ({ id, token }) =>
  fetchJson(`${BASE_URL}/movie/comment/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getMoviesList = ({ page = 0, limit = 10 } = {}) =>
  fetchJson(`${BASE_URL}/movie?${encodeQueryString({ page, limit })}`, {
    method: 'GET',
  });

export const getMovieDetail = ({ id }) =>
  fetchJson(`${BASE_URL}/movie/movie/${id}`, {
    method: 'GET',
  });

export const getMovieComment = ({ id }) =>
  fetchJson(`${BASE_URL}/movie/movie/${id}/comment`, {
    method: 'GET',
  });
