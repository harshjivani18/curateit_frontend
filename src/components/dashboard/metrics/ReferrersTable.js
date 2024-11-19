import MetricsTable from './MetricsTable';
// import FilterLink from 'components/common/FilterLink';
import useMessages from '../../../hooks/useMessages';
import FilterLink from '../common/FilterLink';

export function ReferrersTable({ websiteId, dashUrl=null, ...props }) {
  const { labels } = useMessages();

  const renderLink = ({ x: referrer }) => {
    return (
      <FilterLink
        id="referrer"
        value={referrer}
        externalUrl={`https://${referrer}`}
        label={!referrer && labels.none}
      />
    );
  };

  return (
    <>
      <MetricsTable
        {...props}
        title={labels.referrers}
        type="referrer"
        metric={labels.views}
        websiteId={websiteId}
        renderLabel={renderLink}
        dashUrl={dashUrl}
      />
    </>
  );
}

export default ReferrersTable;
