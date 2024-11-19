import { useMemo } from 'react';
import { Loading } from 'react-basics';
import { colord } from 'colord';
import BarChart from './BarChart';
import { getDateArray, getDateLength } from '../../../lib/date';
import { EVENT_COLORS } from '../../../lib/constants';

const startDate = 1688157000000;
const endDate = 1688243399999;
const unit = "hour";
// const timezone = "Asia";

export function EventsChart({ className }) {
  const isLoading = false;
  const data = [];

  const datasets = useMemo(() => {
    if (!data) return [];
    if (isLoading) return data;

    const map = data.reduce((obj, { x, t, y }) => {
      if (!obj[x]) {
        obj[x] = [];
      }

      obj[x].push({ x: t, y });

      return obj;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, {});

    Object.keys(map).forEach(key => {
      map[key] = getDateArray(map[key], startDate, endDate, unit);
    });

    return Object.keys(map).map((key, index) => {
      const color = colord(EVENT_COLORS[index % EVENT_COLORS.length]);
      return {
        label: key,
        data: map[key],
        lineTension: 0,
        backgroundColor: color.alpha(0.6).toRgbString(),
        borderColor: color.alpha(0.7).toRgbString(),
        borderWidth: 1,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, startDate, endDate, unit]);

  if (isLoading) {
    return <Loading icon="dots" />;
  }

  return (
    <BarChart
      className={className}
      datasets={datasets}
      unit={unit}
      height={300}
      records={getDateLength(startDate, endDate, unit)}
      loading={isLoading}
      stacked
    />
  );
}

export default EventsChart;
