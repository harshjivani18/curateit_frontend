import FilterLink from '../common/FilterLink';
// import FilterButtons from '../common/FilterButtons';
import MetricsTable from './MetricsTable';
import useMessages from '../../../hooks/useMessages';
import { emptyFilter } from '../../../lib/filters';
import usePageQuery from '../../../hooks/usePageQuery';
import FilterButtons from '../common/FilterButtons';

export function PagesTable({ websiteId, showFilters = false, dashUrl=null, ...props }) {
  const {
    resolveUrl,
    query: { view = 'url' },
  } = usePageQuery();
  const { labels } = useMessages();

  const handleSelect = key => {
    window.open(resolveUrl({ view: key }), "_self" );
  };

  const buttons = [
    {
      label: 'URL',
      key: 'url',
    },
    {
      label: labels.title,
      key: 'title',
    },
  ];

  const renderLink = ({ x }) => {
    return <FilterLink id={view} value={x} label={!x && labels.none} />;
  };

  return (
    <>
      {showFilters && <FilterButtons items={buttons} selectedKey={view} onSelect={handleSelect} />}
      <MetricsTable
        {...props}
        dashUrl={dashUrl}
        title={labels.pages}
        type={view}
        metric={labels.views}
        websiteId={websiteId}
        dataFilter={emptyFilter}
        renderLabel={renderLink}
      />
    </>
  );
}

export default PagesTable;
