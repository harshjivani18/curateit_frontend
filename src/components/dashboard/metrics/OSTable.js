import MetricsTable from './MetricsTable';
import FilterLink from '../common/FilterLink';
import useMessages from '../../../hooks/useMessages';

export function OSTable({ websiteId, dashUrl=null, ...props }) {
  const { labels } = useMessages();

  function renderLink({ x: os }) {
    return <FilterLink id="os" value={os}>
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/umami/os/${
            os?.toLowerCase().replaceAll(/[^\w]+/g, '-') || 'unknown'
          }.png`}
          alt={os}
          width={16}
          height={16}
        />
    </FilterLink>;
  }

  return (
    <MetricsTable
      {...props}
      dashUrl={dashUrl}
      websiteId={websiteId}
      title={labels.os}
      metric={labels.visitors}
      renderLabel={renderLink}
      type="os"
    />
  );
}

export default OSTable;
