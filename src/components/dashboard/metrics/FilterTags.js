import { Button, Icon, Icons, Text } from 'react-basics';
import styles from './FilterTags.module.css';
import usePageQuery from '../../../hooks/usePageQuery';
import session from '../../../utils/session';

export function FilterTags({ params, showClearFilter = true }) {
  const {
    resolveUrl
  } = usePageQuery();

  if (Object.keys(params).filter(key => params[key]).length === 0) {
    return null;
  }

  function handleCloseFilter(param) {
    if (!param) {
      resolveUrl({ view: undefined }, true);
      window.open(`/u/${session.username}/timeline`, "_self");
    } else {
      window.open(resolveUrl({ [param]: undefined }), "_self");
    }
  }

  return (
    <div className={styles.filters}>
      {/* {Object.keys(params).map(key => {
        if (!params[key]) {
          return null;
        }
        return (
          <div key={key} className={styles.tag} onClick={() => handleCloseFilter(key)}>
            <Text>
              <b>{`${key}`}</b> = {`${params[key]}`}
            </Text>
            <Icon>
              <Icons.Close />
            </Icon>
          </div>
        );
      })} */}
      {showClearFilter && <Button size="sm" variant="quiet" onClick={() => handleCloseFilter()}>
        <Icon>
          <Icons.Close />
        </Icon>
        <Text>Clear Filter</Text>
      </Button>}
    </div>
  );
}

export default FilterTags;
