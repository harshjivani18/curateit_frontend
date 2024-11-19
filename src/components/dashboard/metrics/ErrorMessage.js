import { Icon, Icons, Text } from 'react-basics';
import styles from './ErrorMessage.module.css';
import useMessages from '../../../hooks/useMessages';

export function ErrorMessage() {
  const { messages } = useMessages();

  return (
    <div className={styles.error}>
      <Icon className={styles.icon} size="large">
        <Icons.Alert />
      </Icon>
      <Text>{messages.error?.defaultMessage}</Text>
    </div>
  );
}

export default ErrorMessage;
