import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { StatusLight, Loading } from 'react-basics';
import classNames from 'classnames';
import Chart from 'chart.js/auto';
import HoverTooltip from '../common/HoverTooltip';
import { formatLongNumber } from '../../../lib/format';
import { dateFormat } from '../../../lib/date';
import useTheme from '../../../hooks/useTheme';
import { DEFAULT_ANIMATION_DURATION, THEME_COLORS } from '../../../lib/constants';
import styles from './BarChart.module.css';
import Legend from './Legend';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-moment';

export function BarChart({
  datasets,
  unit,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  stacked = false,
  loading = false,
  onCreate = () => { },
  onUpdate = () => { },
  className,
}) {
  const canvas = useRef();
  const chart = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [theme] = useTheme();

  const colors = useMemo(
    () => ({
      text: THEME_COLORS[theme].gray700,
      line: THEME_COLORS[theme].gray200,
    }),
    [theme],
  );


  const renderYLabel = label => {
    return +label > 1000 ? formatLongNumber(label) : label;
  };

  const renderXLabel = useCallback(
    (label, index, values) => {
      const d = new Date(values[index].value);

      switch (unit) {
        case 'minute':
          return dateFormat(d, 'h:mm');
        case 'hour':
          return dateFormat(d, 'p');
        case 'day':
          return dateFormat(d, 'MMM d');
        case 'month':
          return dateFormat(d, 'MMM');
        default:
          return label;
      }
    },
    [unit],
  );

  const renderTooltip = useCallback(
    model => {
      const { opacity, labelColors, dataPoints } = model.tooltip;

      if (!dataPoints?.length || !opacity) {
        setTooltip(null);
        return;
      }

      const formats = {
        millisecond: 'T',
        second: 'pp',
        minute: 'p',
        hour: 'h:mm aaa - PP',
        day: 'PPPP',
        week: 'PPPP',
        month: 'LLLL yyyy',
        quarter: 'qqq',
        year: 'yyyy',
      };

      setTooltip(
        <div className={styles.tooltip}>
          <div>{dateFormat(new Date(dataPoints[0].raw.x), formats[unit])}</div>
          <div>
            <StatusLight color={labelColors?.[0]?.backgroundColor}>
              <div className={styles.value}>
                {formatLongNumber(dataPoints[0].raw.y)} {dataPoints[0].dataset.label?.defaultMessage}
              </div>
            </StatusLight>
          </div>
        </div>,
      );
    },
    [unit],
  );

  const getOptions = useCallback(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: animationDuration,
        resize: {
          duration: 0,
        },
        active: {
          duration: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          external: renderTooltip,
        },
      },
      scales: {
        x: {
          type: 'time',
          stacked: true,
          time: {
            unit,
          },
          // time: {
          //   parser: 'HH:mm',
          //   tooltipFormat: 'HH:mm',
          //   unit: 'hour',
          //   displayFormats: {
          //     hour: 'HH:mm',
          //   },
          // },
          grid: {
            display: false,
          },
          border: {
            color: colors.line,
          },
          ticks: {
            color: colors.text,
            autoSkip: false,
            maxRotation: 0,
            callback: renderXLabel,
          },
          adapters: {
            date: {
              locale: enUS
            }
          }
        },
        y: {
          type: 'linear',
          min: 0,
          beginAtZero: true,
          stacked,
          grid: {
            color: colors.line,
          },
          border: {
            color: colors.line,
          },
          ticks: {
            color: colors.text,
            callback: renderYLabel,
          }
        },
      },
    };
  }, [animationDuration, renderTooltip, renderXLabel, stacked, colors, unit]);


  const createChart = () => {
    Chart.defaults.font.family = 'Inter';

    const options = getOptions();

    // datasets.forEach((dataset, index) => {
    //   // chart.current.data.datasets[index].data = dataset.data;
    //   datasets[index].data = dataset.data;
    //   dataset.label = dataset.label?.defaultMessage;
    // });

    chart.current = new Chart(canvas.current, {
      type: 'bar',
      data: {
        datasets,
      },
      options,
    });

    onCreate(chart.current);
  };

  const updateChart = () => {
    setTooltip(null);

    datasets.forEach((dataset, index) => {
      chart.current.data.datasets[index].data = dataset.data;
      chart.current.data.datasets[index].label = dataset.label;
    });

    chart.current.options = getOptions();

    onUpdate(chart.current);

    chart.current.update();
  };

  useEffect(() => {
    if (datasets) {
      if (!chart.current) {
        createChart();
      } else {
        updateChart();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasets, unit, theme, animationDuration]);

  return (
    <>
      <div className={classNames(styles.chart, className)}>
        {loading && <Loading position="page" icon="dots" />}
        <canvas ref={canvas} />
      </div>
      <Legend chart={chart.current} />
      {tooltip && <HoverTooltip tooltip={tooltip} />}
    </>
  );
}

export default BarChart;
