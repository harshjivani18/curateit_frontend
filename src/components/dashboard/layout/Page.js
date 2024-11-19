import classNames from 'classnames';
import { Banner, Loading } from 'react-basics';
// import useMessages from 'hooks/useMessages';
import styles from './Page.module.css';

export function Page({ className, error, loading, children, isPagePadding=true }) {
  // const { formatMessage, messages } = useMessages();

  if (error) {
    // return <Banner variant="error">{formatMessage(messages.error)}</Banner>;
    return <Banner variant="error">Error message</Banner>;
  }

  if (loading) {
    return <Loading icon="spinner" size="xl" position="page" />;
  }

  return <div className={classNames(styles.page, className)} style={{
    padding: isPagePadding ? "0 30px" : 0
  }}>{children}</div>;
}

export default Page;
