import MetricsTable from './MetricsTable';
import useMessages from '../../../hooks/useMessages';

export function EventsTable({ websiteId, dashUrl=null, ...props }) {
  const { labels } = useMessages();

  function handleDataLoad(data) {
    props.onDataLoad?.(data);
  }

  return (
    <MetricsTable
      {...props}
      dashUrl={dashUrl}
      title={labels.events}
      type="event"
      metric={labels.actions}
      websiteId={websiteId}
      onDataLoad={handleDataLoad}
    />
  );
}

export default EventsTable;
