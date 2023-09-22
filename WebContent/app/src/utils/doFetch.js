const defaultHeader = {
  'Content-Type': 'application/json',
  Accept: 'application/json, text/plain, */*',
  chartset: 'utf-8',
}

export default function doFetch(url, { method = 'GET', body, signal, headers, type, ...rest } = {}) {
  const finalHeader = { ...defaultHeader, ...headers }
  const parseFun = type || (finalHeader.Accept.includes('application/json') ? 'json' : 'text')
  let finalBody = body

  if (finalHeader['Content-Type'].includes('application/json') && body) {
    finalBody = JSON.stringify(body)
  }

  return fetch(url, {
    method,
    mode: 'cors',
    headers: finalHeader,
    signal,
    body: finalBody,
    ...rest,
  }).then(response => {
    if (response.ok) {
      return response[parseFun]()
    }

    return undefined
  }).catch(e => {
    console.error(e)
    throw(e)
  })
}

export const getQueryParamsString = (params = {}) => {
  if (!Object.keys(params)?.length) {
    return '';
  }
  let string = '?';
  Object.keys(params).forEach((key, index) => {
    if (index !== 0) {
      string += '&'
    }
    if (params[key]) {
      string += `${key}=${params[key]}`
    } else {
      string += key
    }
  })
  return string;
}
