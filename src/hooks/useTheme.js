import { useEffect } from 'react';

export default function useTheme() {
  // const defaultTheme =
  //   typeof window !== 'undefined'
  //     ? window?.matchMedia('(prefers-color-scheme: dark)')?.matches
  //       ? 'dark'
  //       : 'light'
  //     : 'light';
  // const theme = useStore(selector) || getItem(THEME_CONFIG) || defaultTheme;
  // const theme = defaultTheme;
  const theme = "light";

  // function saveTheme(value) {
  //   setItem(THEME_CONFIG, value);
  //   setTheme(value);
  // }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // useEffect(() => {
  //   const url = new URL(window?.location?.href);
  //   const theme = url.searchParams.get('theme');

  //   // if (['light', 'dark'].includes(theme)) {
  //   //   saveTheme(theme);
  //   // }
  // }, []);

  // return [theme, saveTheme];
  return [theme];
}
