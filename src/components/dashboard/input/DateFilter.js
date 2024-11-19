import { useState } from 'react';
import { Icon, Modal, Dropdown, Item, Text, Flexbox } from 'react-basics';
import { endOfYear, isSameDay } from 'date-fns';
// import useLocale from 'hooks/useLocale';
import { dateFormat, getDateRangeValues } from '../../../lib/date';
import Icons from '../icons';
import DatePickerForm from '../metrics/DatePickerForm';
import useDateRange from '../../../hooks/useDateRange';
import { useDispatch } from 'react-redux';
import { getWebsite } from '../../../actions/analytics';

export function DateFilter({ websiteId, value, className }) {
  const dispatch = useDispatch()
  const [dateRange, setDateRange] = useDateRange(websiteId);
  const { startDate, endDate } = dateRange;
  const [showPicker, setShowPicker] = useState(false);

  async function handleDateChange(value) {
    if(value === "all"){
      dispatch(getWebsite()).then(res => {
        if(res?.payload?.data){
          setDateRange({ value, ...getDateRangeValues(new Date(res?.payload?.data.createdAt), Date.now()) });
        }
      })
    } else if (value !== 'all') {
      setDateRange(value)
    }
  }

  const options = [
    { 
      label: "Today", 
      value: '1day' 
    },
    {
      label: "Last 24 hours",
      value: '24hour',
    },
    {
      label: "Yesterday",
      value: '-1day',
    },
    {
      label: "This week",
      value: '1week',
      divider: true,
    },
    {
      label: "Last 7 days",
      value: '7day',
    },
    {
      label: "This month",
      value: '1month',
      divider: true,
    },
    {
      label: "Last 30 days",
      value: '30day',
    },
    {
      label: "Last 90 days",
      value: '90day',
    },
    { label: "This year",
      value: '1year'
    },
    websiteId && { label: "All time",
      value: 'all',
      divider: true,
    },
    {
      label: "Custom-range",
      value: 'custom',
      divider: true,
    },
  ].filter(n => n);

  const renderValue = value => {
    return value === 'custom' ? (
      <CustomRange startDate={startDate} endDate={endDate} onClick={() => handleChange('custom')} />
    ) : (
      options.find(e => e.value === value).label
    );
  };

  const handleChange = value => {
    if (value === 'custom') {
      setShowPicker(true);
      return;
    }
    handleDateChange(value);
  };

  const handlePickerChange = value => {
    setShowPicker(false);
    handleDateChange(value);
  };

  const handleClose = () => setShowPicker(false);

  return (
    <>
      <Dropdown
        className={className}
        items={options}
        renderValue={renderValue}
        value={value}
        alignment="end"
        onChange={handleChange}
      >
        {({ label, value, divider }) => (
          <Item key={value} divider={divider}>
            {label}
          </Item>
        )}
      </Dropdown>
      {showPicker && (
        <Modal onClose={handleClose}>
          <DatePickerForm
            startDate={startDate}
            endDate={endDate}
            minDate={new Date(2000, 0, 1)}
            maxDate={endOfYear(new Date())}
            onChange={handlePickerChange}
            onClose={() => setShowPicker(false)}
          />
        </Modal>
      )}
    </>
  );
}

const CustomRange = ({ startDate, endDate, onClick }) => {
  // const { locale } = useLocale();

  function handleClick(e) {
    e.stopPropagation();

    onClick();
  }

  return (
    <Flexbox gap={10} alignItems="center" wrap="nowrap">
      <Icon className="mr-2" onClick={handleClick}>
        {/* <Icons.Calendar /> */}
        <img src={Icons.Calendar} alt="calender icon" />
      </Icon>
      <Text>
        {dateFormat(startDate, 'd LLL y')}
        {!isSameDay(startDate, endDate) && ` — ${dateFormat(endDate, 'd LLL y')}`}
        {/* {dateFormat(startDate, 'd LLL y', locale)}
        {!isSameDay(startDate, endDate) && ` — ${dateFormat(endDate, 'd LLL y', locale)}`} */}
      </Text>
    </Flexbox>
  );
};

export default DateFilter;
