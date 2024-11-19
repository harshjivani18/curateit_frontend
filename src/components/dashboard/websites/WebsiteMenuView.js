import { Icon, Button, Flexbox, Text } from 'react-basics';
import { GridRow, GridColumn } from '../layout/Grid';
import BrowsersTable from '../metrics/BrowsersTable';
import CountriesTable from '../metrics/CountriesTable';
import RegionsTable from '../metrics/RegionsTable';
import CitiesTable from '../metrics/CitiesTable';
import DevicesTable from '../metrics/DevicesTable';
import OSTable from '../metrics/OSTable';
import PagesTable from '../metrics/PagesTable';
import QueryParametersTable from '../metrics/QueryParametersTable';
import ReferrersTable from '../metrics/ReferrersTable';
import ScreenTable from '../metrics/ScreenTable';
import EventsTable from '../metrics/EventsTable';
import Icons from '../icons';
import SideNav from '../layout/SideNav';
import useMessages from '../../../hooks/useMessages';
import styles from './WebsiteMenuView.module.css';
import usePageQuery from '../../../hooks/usePageQuery';
import session from '../../../utils/session';

const views = {
  url: PagesTable,
  title: PagesTable,
  referrer: ReferrersTable,
  browser: BrowsersTable,
  os: OSTable,
  device: DevicesTable,
  screen: ScreenTable,
  country: CountriesTable,
  region: RegionsTable,
  city: CitiesTable,
  // language: LanguagesTable,
  event: EventsTable,
  query: QueryParametersTable,
};

export default function WebsiteMenuView({ websiteId, websiteDomain }) {
  const { labels } = useMessages();
  const dir = null
  const {
    resolveUrl,
    query: { view },
  } = usePageQuery();

  const items = [
    {
      key: 'url',
      label: labels.pages?.defaultMessage,
      url: resolveUrl({ view: 'url' }),
    },
    {
      key: 'referrer',
      label: labels.referrers?.defaultMessage,
      url: resolveUrl({ view: 'referrer' }),
    },
    {
      key: 'browser',
      label: labels.browsers?.defaultMessage,
      url: resolveUrl({ view: 'browser' }),
    },
    {
      key: 'os',
      label: labels.os?.defaultMessage,
      url: resolveUrl({ view: 'os' }),
    },
    {
      key: 'device',
      label: labels.devices?.defaultMessage,
      url: resolveUrl({ view: 'device' }),
    },
    {
      key: 'country',
      label: labels.countries?.defaultMessage,
      url: resolveUrl({ view: 'country' }),
    },
    {
      key: 'region',
      label: labels.regions?.defaultMessage,
      url: resolveUrl({ view: 'region' }),
    },
    {
      key: 'city',
      label: labels.cities?.defaultMessage,
      url: resolveUrl({ view: 'city' }),
    },
    {
      key: 'language',
      label: labels.languages?.defaultMessage,
      url: resolveUrl({ view: 'language' }),
    },
    {
      key: 'screen',
      label: labels.screens?.defaultMessage,
      url: resolveUrl({ view: 'screen' }),
    },
    {
      key: 'event',
      label: labels.events?.defaultMessage,
      url: resolveUrl({ view: 'event' }),
    },
    {
      key: 'query',
      label: labels.query?.defaultMessage,
      url: resolveUrl({ view: 'query' }),
    },
  ];

  const DetailsComponent = views[view] || (() => null);

  return (
    <GridRow>
      <GridColumn xs={12} sm={12} md={12} defaultSize={3} className={styles.menu}>
        <a href={`/u/${session.username}/timeline`} onClick={() => resolveUrl({ view: undefined })}>
          <Flexbox justifyContent="center">
            <Button variant="quiet">
              <Icon rotate={dir === 'rtl' ? 0 : 180}>
                <Icons.ArrowRight />
              </Icon>
              <Text>{labels.back?.defaultMessage}</Text>
            </Button>
          </Flexbox>
        </a>
        <SideNav items={items} selectedKey={view} shallow={true} />
      </GridColumn>
      <GridColumn xs={12} sm={12} md={12} defaultSize={9} className={styles.content}>
        <DetailsComponent
          websiteId={websiteId}
          websiteDomain={websiteDomain}
          limit={false}
          animate={false}
          showFilters={true}
          virtualize={true}
        />
      </GridColumn>
    </GridRow>
  );
}
