import { useState, useEffect } from 'react';
import enUS from '../components/dashboard/assets/intl/country/en-US.json';

const countryNames = {
  'en-US': enUS,
};

export default function useCountryNames(locale) {
  const [list, setList] = useState(countryNames[locale] || enUS);

  async function loadData() {
    setList(enUS);
  }

  useEffect(() => {
    if (!countryNames[locale]) {
      loadData(locale);
    } else {
      setList(countryNames[locale]);
    }
  }, [locale]);

  return list;
}
