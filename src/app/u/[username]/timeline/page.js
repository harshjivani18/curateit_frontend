"use client"
// import Script from 'next/script'
import CommonLayout from '@components/layouts/CommonLayout'
import Tabs from '@components/tabs/Tabs'
import React, { useState } from 'react'
import TimelineView from './Timeline'
import Dashboard from '@containers/dashboard/Dashboard'
import Usage from '@containers/usage-dashboard/Usage'
// import Dashboard from './Dashboard'

const TABS = [
    {
        name: "Analytics",
        current: true,
        disabled: false
    },
    {
        name: "Usage",
        current: false,
        disabled: false
    },
    {
        name: "Timeline",
        current: false,
        disabled: false
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const page = () => {
    const [tabs, setTabs] = useState(TABS)

    const activateTab = (name) => {
        const newTab = tabs.map(t => {
            if (t.name === name) {
                return { ...t, current: true }
            } else {
                return { ...t, current: false }
            }
        })

        setTabs(newTab);
    }

    const checkAtive = (name) => {
        const currentTab = tabs.filter(t => t.name === name)[0];
        if (currentTab?.current) {
            return true
        }
        return false
    }

    return (
        <>
            <CommonLayout showSecondarySidebar={false}>
                <div>
                    <div className='flex justify-start items-center p-4'>
                        <Tabs showTabs={tabs} page = "timeline" activateTab={activateTab} />
                    </div>
                    <div className='h-full'>
                        <div className='mt-4'>
                            <div className={classNames(checkAtive('Usage') ? '' : 'hidden')}>
                                <Usage />
                            </div>
                            <div className={classNames(checkAtive('Timeline') ? '' : 'hidden')}>
                                <TimelineView />
                            </div>
                            <div className={classNames(checkAtive('Analytics') ? '' : 'hidden')}>
                                <Dashboard />
                            </div>
                        </div>
                    </div>
                </div>
            </CommonLayout>
        </>
    )
}

export default page