import classNames from 'classnames';
import styles from './NoData.module.css';
import useMessages from '../../../hooks/useMessages';

export function NoData({ className }) {
  const {  messages } = useMessages();

  return (
    <div className={classNames(styles.container, className)}>
      {messages.noDataAvailable?.defaultMessage}
    </div>
  );
}

export default NoData;
