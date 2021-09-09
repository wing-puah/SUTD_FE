import { fetchJson, encodeQueryString } from 'lib/fetch-json';
import { BASE_URL } from 'appConstants';

export const addComment = ({ data, token }) =>
  fetchJson(`${BASE_URL}/movie/comment`, {
    method: 'POST',
    body: {
      ...data,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteComment = ({ id, token }) =>
  fetchJson(`${BASE_URL}/movie/comment/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getMoviesList = ({ page = 0, limit = 10, token } = {}) =>
  fetchJson(`${BASE_URL}/movie/comment?${encodeQueryString({ page, limit })}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getMovieDetail = ({ id, token }) =>
  fetchJson(`${BASE_URL}/movie/movie/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getMovieComemnt = ({ id, token }) =>
  fetchJson(`${BASE_URL}/movie/movie/${id}/comment`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
