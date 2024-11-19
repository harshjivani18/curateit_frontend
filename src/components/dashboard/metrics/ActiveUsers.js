import { useEffect, useMemo, useState } from 'react';
import { StatusLight } from 'react-basics';
import styles from './ActiveUsers.module.css';
import { useDispatch } from 'react-redux';
import { getActiveUser } from '../../../actions/analytics';

export function ActiveUsers({ websiteId, value, refetchInterval = 60000 }) {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(getActiveUser()).then(res => {
      if(res?.payload?.data){
        setData(res.payload.data);
      }
    });
  },[dispatch])

  const count = useMemo(() => {
    if (websiteId) {
      return data?.[0]?.x || 0;
    }

    return value !== undefined ? value : 0;
  }, [data, value, websiteId]);

  if (count === 0) {
    return null;
  }

  return (
    <StatusLight variant="success">
      <div className={styles.text}>{count} current {count > 1 ? "vistors" : "visitor"}</div>
    </StatusLight>
  );
}

export default ActiveUsers;
