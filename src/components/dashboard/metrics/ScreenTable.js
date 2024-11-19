import MetricsTable from './MetricsTable';
import useMessages from '../../../hooks/useMessages';

export function ScreenTable({ websiteId, dashUrl=null, ...props }) {
  const { labels } = useMessages();

  return (
    <MetricsTable
      {...props}
      dashUrl={dashUrl}
      title={labels.screens}
      type="screen"
      metric={labels.visitors}
      websiteId={websiteId}
    />
  );
}

export default ScreenTable;
