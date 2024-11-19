'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDomainDetails } from '@actions/gems'
import { Spin } from 'antd'
import SocialFeedInfoPanel from '@components/GemProfile/SocialFeedInfoPanel'
import Info from '@components/info/Info'

const DEFAULT_PARAMS = [
    "&email=true&phonenumber=true",
    "&brandcolor=true&screenshot=true",
    "&sociallink=true&category=true",
    "&text=true",
    "&technologystack=true&digitalrank=true"
]

const InfoContainer = ({ url, mediaType, title, socialFeed, mainBookmark }) => {
    const dispatch = useDispatch()
    const urlDetails = useSelector((state) => state.gems.details)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const currentParamEle = useRef(0)
    const getDomainDetails = useCallback(
        (params, url) => {
            setLoading(false)
            dispatch(fetchDomainDetails(url + params)).then((res) => {
                if (currentParamEle.current < DEFAULT_PARAMS.length + 1) {
                    currentParamEle.current = currentParamEle.current + 1
                    if (DEFAULT_PARAMS[currentParamEle.current]) {
                        getDomainDetails(DEFAULT_PARAMS[currentParamEle.current], url)
                    }
                } else {
                    return false
                }
            })
        },
        [dispatch]
    )



    useEffect(() => {
        setLoading(true);
        setError(false);
        if (url === urlDetails?.url) {
            setLoading(false)
        } else {
            dispatch(fetchDomainDetails(url)).then((res) => {
                if (res?.type === "FETCH_DOMAIN_DETAILS_FAIL") {
                    setError(true)
                } else if (res?.payload?.data?.SocialWebsites) {
                    // Nothing to show error screen
                    setError(true)
                } else {
                    setError(false);
                    getDomainDetails(DEFAULT_PARAMS[0], url)
                    // if (currentParamEle < DEFAULT_PARAMS.length) {
                    //     getDomainDetails(DEFAULT_PARAMS[0], url)
                    // }
                }

                setLoading(false)
            })
        }
    }, [dispatch, url, urlDetails?.url, getDomainDetails])

    const RenderError = () => (
        <div className="text-center py-10 mt-10">
            <div className="ct-relative mt-2">
                <img
                    className="h-50 w-50 my-0 mx-auto"
                    src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
                    alt="Cloud ellipse icons"
                />
                <div className="absolute top-[85px] left-0 justify-center w-full text-xs text-gray-400">
                    No data found.
                </div>
            </div>
        </div>
    )

  if (socialFeed) return <SocialFeedInfoPanel bookmark={mainBookmark} socialFeed={socialFeed} />
  return (
    <div>
          {loading ? (
              <div className="spinDiv">
                  <Spin size='middle' tip='Loading...' />
              </div>
          ) : error ? (
              <RenderError />
          ) : (
              <Info />
          )}
    </div>
  )
}

export default InfoContainer