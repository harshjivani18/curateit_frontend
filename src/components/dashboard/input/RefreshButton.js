import { LoadingButton, Icon } from 'react-basics';
import Icons from '../icons';
import useDateRange from '../../../hooks/useDateRange';
import { setDateRange } from '../../../actions/dashboard';

export function RefreshButton({ websiteId, isLoading }) {
  const [dateRange] = useDateRange(websiteId);

  function handleClick() {
    if (!isLoading && dateRange) {
      if (/^\d+/.test(dateRange.value)) {
        setDateRange(websiteId, dateRange.value);
      } else {
        setDateRange(websiteId, dateRange);
      }
    }
  }

  return (
    // <Tooltip label="Refresh">
      <LoadingButton loading={isLoading} onClick={handleClick}>
        <Icon>
          <Icons.Refresh />
        </Icon>
      </LoadingButton>
    // </Tooltip>
  );
}

export default RefreshButton;
