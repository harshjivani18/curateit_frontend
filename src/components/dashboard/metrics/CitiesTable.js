import MetricsTable from './MetricsTable';
import { emptyFilter } from '../../../lib/filters';
import FilterLink from '../common/FilterLink';
// import useLocale from '../../../hooks/useLocale';
import useMessages from '../../../hooks/useMessages';

export function CitiesTable({ websiteId, dashUrl=null, ...props }) {
  const { labels } = useMessages();

  function renderLink({ x }) {
    return (
      // <div className={locale}>
      <div >
        <FilterLink id="city" value={x} />
      </div>
    );
  }

  return (
    <MetricsTable
      {...props}
      dashUrl={dashUrl}
      title={labels.cities}
      type="city"
      metric={labels.visitors}
      websiteId={websiteId}
      dataFilter={emptyFilter}
      renderLabel={renderLink}
    />
  );
}

export default CitiesTable;
