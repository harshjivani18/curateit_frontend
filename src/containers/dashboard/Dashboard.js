import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WebsiteDetails from '@components/dashboard/websites/WebsiteDetails'
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import 'react-basics/dist/styles.css';
import './variables.css';
import './locale.css';
import 'chartjs-adapter-date-fns';

import { authorizedUmami, getWebsite } from '@actions/analytics';

const Dashboard = ({
    dashUrl = null,
    showClearFilter=true,
    isPagePadding=true
}) => {
    const dispatch = useDispatch();
    const { umamiUser, website } = useSelector(state => state.analytics) || {};
    // console.log(useSelector(state => state.analytics));

    useEffect(() => {
        if (!umamiUser) {
            dispatch(authorizedUmami()).then((res) => {
                dispatch(getWebsite());
                if (res.error === undefined) {
                }
            });
        }
    })

    return (
        <WebsiteDetails websiteId={website?.id} dashUrl={dashUrl} showClearFilter={showClearFilter} isPagePadding={isPagePadding} />
    )
}

export default Dashboard