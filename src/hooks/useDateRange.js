import { parseDateRange } from '../lib/date';
import { DEFAULT_LOCALE, DEFAULT_DATE_RANGE } from '../lib/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../actions/dashboard';

export default function useDateRange(websiteId) {
  const dispatch = useDispatch()
  const locale = DEFAULT_LOCALE;
  const websiteConfig = useSelector(state => state?.dashboard?.dateRange);
  const defaultConfig = DEFAULT_DATE_RANGE;
  const dateRange = parseDateRange(websiteConfig?.startDate ? websiteConfig : defaultConfig, locale);
  // const dateRange = parseDateRange(websiteConfig ||  defaultConfig, locale);

  function saveDateRange(value) {
    if (websiteId) {
      dispatch(setDateRange(value));
    }
  }

  return [dateRange, saveDateRange];
}
