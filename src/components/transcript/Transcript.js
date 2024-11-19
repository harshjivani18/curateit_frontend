import { Spin } from 'antd';
// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTranscriptUrl } from '@actions/gems';
import { getTranscriptHTML } from '@utils/youtubeTranscripts';

const Transcript = ({ url, width, videoSeekTo }) => {
    const dispatch = useDispatch()
    const formatedWidth = width ? (width.toString().includes('px') ? width : `${width}px`) : null;
    const [isLoading, setIsLoading] = useState(false);
    const [LoadingTranscripts, setLoadingTranscripts] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [selectedLng, setSelectedLng] = useState(null);
    const [transcripts, setTranscript] = useState([]);
    const {isMobileView} = useSelector(state => state.app)

    useEffect(() => {
        (async() => {
            try {
                setIsLoading(true);
                dispatch(fetchTranscriptUrl(url)).then(res => {
                    if (res?.payload?.data?.langs) {
                        setLanguages(res?.payload?.data?.langs)
                        if (Array.isArray(res?.payload?.data?.langs) && res?.payload?.data?.langs.length > 0){
                            setSelectedLng(res?.payload?.data?.langs[0]);
                        }
                        setIsLoading(false);
                    }
                })
                // if (langs?.data?.langs) {
                //     setLanguages(langs?.data?.langs)
                //     setSelectedLng(langs?.data?.langs[0]);
                //     setIsLoading(false);
                // }
            } catch (error) {
                setIsLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[url])

    useEffect(() => {
        (async() => {
            setLoadingTranscripts(true)
            const allTranscripts = await getTranscriptHTML(selectedLng?.link);
            setTranscript(allTranscripts);
            setLoadingTranscripts(false)
        })();
    },[selectedLng])

    const fetchTranscrpts = (item) => {
        setSelectedLng(item)
    }

    const renderLanguages = (item) => {
        return (
            <button className={`p-2 px-4 rounded-2xl border whitespace-nowrap ${(selectedLng && selectedLng.link === item?.link) && "bg-gray-800 text-white"}`} onClick={() => fetchTranscrpts(item)}>{item?.language}</button>
        )
    }

    const renderTranscripts = (item) => {
        return (
            <div className='grid grid-cols-5 py-2'>
                <button onClick={() => videoSeekTo(item?.time)} className='flex justify-start items-center border-none outline-none bg-transparent'>{item?.time}</button>
                <div className='col-span-4'>{item?.text}</div>
            </div>
        )
    }


  return (
      <div style={{ maxWidth: `calc(${formatedWidth} - 90px)` }} className={`${isMobileView ? 'h-[400px]' : 'max-h-[100vh]'} overflow-y-auto custom-scroll`}>
          <span className='font-bold text-lg'>Transcript</span>
        {isLoading ? (
            <div className='flex justify-center items-center py-4'>
                <Spin tip="Loading.." />
            </div>
        ) :
        <div className='w-full'>
                  {languages.length > 0 ? (
                        <>
                            <div className='flex justify-start items-center gap-2 overflow-x-scroll w-full custom-scroll py-2'>
                                {languages.map(lng => renderLanguages(lng))}
                            </div>
                            <div>
                                {LoadingTranscripts ? (
                                    <div className='flex justify-center items-center pt-2'>
                                        <Spin tip="Loading transcripts.." />
                                    </div>
                                    ) : (transcripts.length > 0) ? 
                                            transcripts.map((trans) => renderTranscripts(trans))
                                    : (
                                    <div>
                                        No transcripts available.
                                    </div>
                                )}
                            </div>
                        </>

                  ):(
                    <div className='py-4'>
                        <h2 className='text-center'>Transcript not available</h2>
                    </div>
                  )}

        </div>}
    </div>
  )
}

export default Transcript