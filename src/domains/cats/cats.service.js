import { fetchJson, encodeQueryString } from 'lib/fetch-json';
import { BASE_URL } from 'appConstants';

export const addComment = ({ data, token }) => {
  return fetchJson(`${BASE_URL}/cat/comment`, {
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
  fetchJson(`${BASE_URL}/cat/comment/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getCatsList = ({ skip = 0, limit = 10, ...rest } = {}) =>
  fetchJson(
    `${BASE_URL}/api/cats?${encodeQueryString({ ignoreEncode: ['tags'], skip, limit, ...rest })}`,
    {
      method: 'GET',
    }
  );

export const getCatDetail = ({ id }) =>
  fetchJson(`${BASE_URL}/cat/${id}?json=true`, {
    method: 'GET',
  });

export const getCatComment = ({ id }) =>
  fetchJson(`${BASE_URL}/cat/cat/${id}/comment`, {
    method: 'GET',
  });
