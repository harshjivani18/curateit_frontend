"use client"
import classNames from 'classnames';
import { Menu, Item } from 'react-basics';
import styles from './SideNav.module.css';
import { getRelativeURL } from '../../../lib/format';
import { useEffect, useState } from 'react';

export function SideNav({ selectedKey, items, shallow, onSelect = () => { } }) {
  const [asPath, setAsPath] = useState('');

  useEffect(() => {
    setAsPath(getRelativeURL());
  }, []);
  return (
    <Menu items={items} selectedKey={selectedKey} className={styles.menu} onSelect={onSelect}>
      {({ key, label, url }) => (
        <Item
          key={key}
          className={classNames(styles.item, { [styles.selected]: asPath.startsWith(url) })}
        >
          {/* <a href={url} shallow={shallow}> */}
          <a href={url}>
            {label}
          </a>
        </Item>
      )}
    </Menu>
  );
}

export default SideNav;
