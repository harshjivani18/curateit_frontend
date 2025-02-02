import { StatusLight } from 'react-basics';
import { colord } from 'colord';
import classNames from 'classnames';
import useForceUpdate from '../../../hooks/useForceUpdate';
import styles from './Legend.module.css';

export function Legend({ chart }) {

  const forceUpdate = useForceUpdate();

  const handleClick = index => {
    const meta = chart.getDatasetMeta(index);

    meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;

    chart.update();

    forceUpdate();
  };

  // useEffect(() => {
  //   forceUpdate();
  // }, [locale]);

  if (!chart?.legend?.legendItems.find(({ text }) => text)) {
    return null;
  }
  return (
    <div className={styles.legend}>
      {chart.legend.legendItems.map(({ text, fillStyle, datasetIndex, hidden }) => {
        const color = colord(fillStyle);

        return (
          <div
            key={text?.defaultMessage ? text?.defaultMessage : text}
            className={classNames(styles.label, { [styles.hidden]: hidden })}
            onClick={() => handleClick(datasetIndex)}
          >
            <StatusLight color={color.alpha(color.alpha() + 0.2).toHex()}>
              <span >{text?.defaultMessage ? text?.defaultMessage : text}</span>
            </StatusLight>
          </div>
        );
      })}
    </div>
  );
}

export default Legend;
