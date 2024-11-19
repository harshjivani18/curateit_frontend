import MetricsTable from './MetricsTable';
import FilterLink from '../common/FilterLink';
import useMessages from '../../../hooks/useMessages';

export function DevicesTable({ websiteId, dashUrl=null, ...props }) {
  const { labels } = useMessages();

  function renderLink({ x: device }) {
    return (
      <FilterLink
        id="device"
        value={labels[device] && device}
        label={labels[device] || labels.unknown}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/umami/device/${device?.toLowerCase() || 'unknown'}.png`}
          alt={device}
          width={16}
          height={16}
        />
      </FilterLink>
    );
  }

  return (
    <MetricsTable
      {...props}
      dashUrl={dashUrl}
      title={labels.devices}
      type="device"
      metric={labels.visitors}
      websiteId={websiteId}
      renderLabel={renderLink}
    />
  );
}

export default DevicesTable;
