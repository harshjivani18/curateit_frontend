import MetricsTable from './MetricsTable';
import FilterLink from '../common/FilterLink';
import useCountryNames from '../../../hooks/useCountryNames';
import useMessages from '../../../hooks/useMessages';
import { DEFAULT_LOCALE } from '../../../lib/constants';

export function CountriesTable({ websiteId, dashUrl=null, ...props }) {
  const locale = DEFAULT_LOCALE;
  const countryNames = useCountryNames(locale);
  const { labels } = useMessages();

  function renderLink({ x: code }) {
    return (
      <FilterLink
        id="country"
        className={locale}
        value={countryNames[code] && code}
        label={countryNames[code]}
      >
        {/* <img src={`/images/flags/${code?.toLowerCase() || 'xx'}.png`} alt={code} /> */}
        <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/umami/flags/${code?.toLowerCase() || 'xx'}.png`} alt={code} />
      </FilterLink>
    );
  }

  return (
    <MetricsTable
      {...props}
      title={labels.countries}
      dashUrl={dashUrl}
      type="country"
      metric={labels.visitors}
      websiteId={websiteId}
      renderLabel={renderLink}
    />
  );
}

export default CountriesTable;
