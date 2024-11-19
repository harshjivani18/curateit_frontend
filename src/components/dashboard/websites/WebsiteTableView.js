import { useState } from 'react';
import { GridRow, GridColumn } from '../layout/Grid';
import PagesTable from '../metrics/PagesTable';
import ReferrersTable from '../metrics/ReferrersTable';
import BrowsersTable from '../metrics/BrowsersTable';
import OSTable from '../metrics/OSTable';
import DevicesTable from '../metrics/DevicesTable';
import WorldMap from '../common/WorldMap';
import CountriesTable from '../metrics/CountriesTable';
// import EventsTable from '../metrics/EventsTable';
// import EventsChart from '../metrics/EventsChart';

export default function WebsiteTableView({ websiteId, showClearFilter=true, dashUrl=null, }) {
  const [countryData, setCountryData] = useState();
  const tableProps = {
    websiteId,
    limit: 10,
    dashUrl
  };

  const renderMainView = () => {
    return (
      <>
        <GridRow>
          <GridColumn variant="two">
            <PagesTable {...tableProps} />
          </GridColumn>
          <GridColumn variant="two">
            <ReferrersTable {...tableProps} />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn variant="three">
            <BrowsersTable {...tableProps} />
          </GridColumn>
          <GridColumn variant="three">
            <OSTable {...tableProps} />
          </GridColumn>
          <GridColumn variant="three">
            <DevicesTable {...tableProps} />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn xs={12} sm={12} md={12} defaultSize={8}>
            <WorldMap data={countryData} />
          </GridColumn>
          <GridColumn xs={12} sm={12} md={12} defaultSize={4}>
            <CountriesTable {...tableProps} onDataLoad={setCountryData} />
          </GridColumn>
        </GridRow>
        {/* <GridRow>
          <GridColumn xs={12} sm={12} md={12} lg={4} defaultSize={4}>
            <EventsTable {...tableProps} />
          </GridColumn>
          <GridColumn xs={12} sm={12} md={12} lg={8} defaultSize={8}>
            <EventsChart websiteId={websiteId} />
          </GridColumn>
        </GridRow> */}
      </>
    )
  }

  const renderDrawerView = () => {
    return (
      <>
        <GridRow>
          <GridColumn xs={12} sm={12} md={12} lg={12} defaultSize={12}>
            <ReferrersTable {...tableProps} />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn  xs={12} sm={12} md={12} lg={12} defaultSize={12}>
            <BrowsersTable {...tableProps} />
          </GridColumn>
          <GridColumn  xs={12} sm={12} md={12} lg={12} defaultSize={12}>
            <OSTable {...tableProps} />
          </GridColumn>
          <GridColumn  xs={12} sm={12} md={12} lg={12} defaultSize={12}>
            <DevicesTable {...tableProps} />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn  xs={12} sm={12} md={12} lg={12} defaultSize={12}>
            <CountriesTable {...tableProps} onDataLoad={setCountryData} />
          </GridColumn>
        </GridRow>
        {/* <GridRow>
          <GridColumn xs={12} sm={12} md={12} lg={4} defaultSize={4}>
            <EventsTable {...tableProps} />
          </GridColumn>
          <GridColumn xs={12} sm={12} md={12} lg={8} defaultSize={8}>
            <EventsChart websiteId={websiteId} />
          </GridColumn>
        </GridRow> */}
      </>
    )
  }

  return dashUrl ? renderDrawerView() : renderMainView();
}
