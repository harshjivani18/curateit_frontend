"use client"

import { 
    CheckBadgeIcon, 
    ExclamationCircleIcon }                 from '@heroicons/react/24/outline';
import React, { useEffect, useRef,
       useState }                           from 'react'
import { ColorRing }                        from 'react-loader-spinner';
import { useParams }                        from 'next/navigation';
import { useDispatch }                      from 'react-redux';

import session                              from '@utils/session';

import { importPocketData }                 from '@actions/pocketAccess';

const Pocket = () => {
    const dispatch                          = useDispatch();
    const {access_token}                    = useParams();
    const shouldCallApi                     = useRef(true);
    const [loading, setLoading]             = useState(true);
    const [error, setError]                 = useState(false);
    const [success, setSuccess]             = useState(false)


    useEffect(() =>{
        if(shouldCallApi.current){
            shouldCallApi.current = false;
            (async () => {
                const data = {
                    token: session.token,
                    requestCode: access_token
                }
        
                const res = await dispatch(importPocketData(data));
                if(res?.payload?.status === 200){
                    setSuccess(true);
                    setError(false);
                    setLoading(false);
                }else{
                    setError(true);
                    setSuccess(false);
                    setLoading(false);
                }
            })();
        }

    },[dispatch])

  return (
    <div className='w-[100%] pt-[30vh] flex justify-center items-center'>
        <div className='flex flex-col justify-start items-center'>
            {loading && (
                <>
                      <ColorRing
                          visible={true}
                          height="140"
                          width="140"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#4E89FF', '#36BFFF', '#1e3a8a']}
                      />
                      <h1 className='font-semibold text-lg text-gray-600'>{"Importing data from pocket"}</h1>
                </>
            )}
              {!loading && success && (
                <>
                    <CheckBadgeIcon className='w-[10rem] h-[10rem] text-green-600' />
                    <h1 className='font-semibold text-lg text-gray-600'>Data imported successfull</h1>
                </>
            )}
              {!loading && error && (
                <>
                    <ExclamationCircleIcon className='w-[10rem] h-[10rem] text-red-500' />
                    <h1 className='font-semibold text-lg text-gray-600'>Couldn't import data from pocket</h1>
                </>
            )}
        </div>
    </div>
  )
}

export default Pocket