export const encodeQueryString = ({ ignoreEncode = [], ...params }) =>
  Object.keys(params)
    .filter(
      (k) =>
        (typeof params[k] === 'string' && params[k].length > 0) ||
        (!isNaN(params[k]) && !isNaN(parseFloat(params[k])))
    )
    .map((k) => {
      return ignoreEncode.includes(k)
        ? `${k}=${params[k]}`
        : `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join('&');

/**
 *
 * @param {RequestInfo} info
 * @param {RequestInit} [init]
 */
export const fetchJson = (info, { headers, body, ...init } = {}) => {
  const abortController = new AbortController();

  const result = fetch(info, {
    ...init,
    signal: abortController.signal,
    body: body && typeof body === 'object' ? JSON.stringify(body) : body,
    headers: Object.assign(
      {
        accept: 'application/json',
        ...headers,
      },
      body
        ? {
            'Content-Type': 'application/json',
          }
        : {}
    ),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    })
    .catch((err) => {
      if (err.name !== 'AbortError') {
        throw err;
      }
    });

  result.cancel = () => abortController.abort();

  return result;
};
