import { Icon, Icons } from 'react-basics';
import classNames from 'classnames';
import useMessages from '../../../hooks/useMessages';
import styles from './FilterLink.module.css';
import usePageQuery from '../../../hooks/usePageQuery';

export function FilterLink({ id, value, label, externalUrl, children, className }) {
  const { labels } = useMessages();
  const { resolveUrl, query } = usePageQuery();
  const active = query[id] !== undefined;
  const selected = query[id] === value;


  return (
    <div
      className={classNames(styles.row, className, {
        [styles.inactive]: active && !selected,
        [styles.active]: active && selected,
      })}
    >
      {children}
      {!value && `(${label?.defaultMessage || labels.unknown?.defaultMessage})`}
      {value && (
        <a href={resolveUrl({ [id]: value })} className={styles.label?.defaultMessage} onClick={() => resolveUrl({ [id]: value })}>
          {label?.defaultMessage || value}
        </a>
      )}
      {externalUrl && (
        <a className={styles.link} href={externalUrl} target="_blank" rel="noreferrer noopener">
          <Icon className={styles.icon}>
            <Icons.External />
          </Icon>
        </a>
      )}
    </div>
  );
}

export default FilterLink;
