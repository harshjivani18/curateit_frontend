import { useState } from 'react';
import FilterButtons from '../common/FilterButtons';
import { emptyFilter, paramFilter } from '../../../lib/filters';
import { FILTER_RAW, FILTER_COMBINED } from '../../../lib/constants';
import MetricsTable from './MetricsTable';
import useMessages from '../../../hooks/useMessages';
import styles from './QueryParametersTable.module.css';

const filters = {
  [FILTER_RAW]: emptyFilter,
  [FILTER_COMBINED]: paramFilter,
};

export function QueryParametersTable({ websiteId, showFilters, dashUrl=null, ...props }) {
  const [filter, setFilter] = useState(FILTER_COMBINED);
  const { labels } = useMessages();

  const buttons = [
    {
      label: labels.filterCombined?.defaultMessage,
      key: FILTER_COMBINED,
    },
    { label: labels.filterRaw?.defaultMessage, key: FILTER_RAW },
  ];

  return (
    <>
      {showFilters && <FilterButtons items={buttons} selectedKey={filter} onSelect={setFilter} />}
      <MetricsTable
        {...props}
        title={labels.query}
        type="query"
        metric={labels.views}
        dashUrl={dashUrl}
        websiteId={websiteId}
        dataFilter={filters[filter]}
        renderLabel={({ x, p, v }) =>
          filter === FILTER_RAW ? (
            x
          ) : (
            <div className={styles.item}>
              {/* <div className={styles.param}>{urlEncode(p)}</div>
              <div className={styles.value}>{urlEncode(v)}</div> */}
              <div className={styles.param}>{p}</div>
              <div className={styles.value}>{v}</div>
            </div>
          )
        }
        delay={0}
      />
    </>
  );
}

export default QueryParametersTable;
