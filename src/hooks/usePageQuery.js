"use client"
import { useEffect, useMemo, useState } from 'react';
// import { buildUrl } from 'next-basics';
import { getRelativeURL } from '../lib/format';

export default function usePageQuery() {
  const [pathname, setPathname] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const { pathname, search } = window.location;
    setPathname(pathname);
    setSearch(search);
  }, []);

  const [asPath, setAsPath] = useState('');

  useEffect(() => {
    setAsPath(getRelativeURL());
  }, []);

  const query = useMemo(() => {
    if (!search) {
      return {};
    }

    const params = search.substring(1).split('&');

    return params.reduce((obj, item) => {
      const [key, value] = item.split('=');

      obj[key] = decodeURIComponent(value);

      return obj;
    }, {});
  }, [search]);

  function resolveUrl(params, reset) {
    return buildUrl(asPath.split('?')[0], { ...(reset ? {} : query), ...params });
  }

  return { pathname, query, resolveUrl };
}


const buildUrl = (path, queryParams = {}, locale = '') => {
  const baseUrl = window.location.origin;
  // Remove leading and trailing slashes from the base URL
  const cleanedBaseUrl = baseUrl.replace(/^\/|\/$/g, '');

  // Remove leading and trailing slashes from the path
  const cleanedPath = path.replace(/^\/|\/$/g, '');

  // Construct the URL with the base URL and path
  let url = `${cleanedBaseUrl}/${cleanedPath}`;

  // Append locale to the URL if provided
  if (locale) {
    // Remove leading and trailing slashes from the locale
    const cleanedLocale = locale.replace(/^\/|\/$/g, '');

    url = `/${cleanedLocale}${url}`;
  }

  // Append query parameters to the URL if any
  const queryParamsKeys = Object.keys(queryParams);

  if (queryParamsKeys.length > 0) {
    const query = queryParamsKeys
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    url = `${url}?${query}`;
  }

  return url;
};