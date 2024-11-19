'use client'

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import React, { 
    useRef, 
    useCallback, 
    useState, 
    useEffect 
}                                   from 'react'
import { Viewer, Worker }           from '@react-pdf-viewer/core';
import { defaultLayoutPlugin }      from '@react-pdf-viewer/default-layout';
import { v4 as uuidv4 }             from 'uuid';
import {
    highlightPlugin,
}                                   from '@react-pdf-viewer/highlight';
import { zoomPlugin }               from '@react-pdf-viewer/zoom';
import { useDispatch, useSelector } from 'react-redux';

import { HIGHLIGHTED_COLORS }       from '@utils/constants';
import session                      from '@utils/session';

import { 
    setCurrentGem, 
    addHighlight
 }                                  from '@actions/gems';

const RenderPdf = ({ url, bookmark }) => {
    const currentGem = useSelector(state => state.gems.currentGem);
    const [highlightData, setHighlightData] = useState([]);
    const exportRef = useRef();
    const dispatch = useDispatch();
    const noteEles = new Map();
    const zoomPluginInstance = zoomPlugin();

    useEffect(() => {
        formatHighlights(currentGem?.attributes?.child_gem_id?.data || []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGem])


    //Set highlight
    const formatHighlights = (gems) => {
        if(gems && gems.length > 0){
            const newHighlights = gems.map(high => {
                return {
                    id: high?.attributes?.media?._id,
                    highlightAreas: high?.attributes?.media?.box,
                    quote: high?.attributes?.media?.text,
                    style: high?.attributes?.media?.color?.bg
                };
            });

            setHighlightData(newHighlights)
            renderHighlights(newHighlights)
        }
    }


    const renderHighlightTarget = (props) => props.toggle();

    const renderHighlightContent = (props) => {
        // const note = {
        //     id: uuidv4(),
        //     highlightAreas: props.highlightAreas,
        //     quote: props.selectedText,
        //     style: '#FFFAB3'
        // };
        if(bookmark?.author?.data?.id.toString() !== session.userId.toString()){
            props.cancel();
            return false;
        }

        let diff = true;
        if (highlightData.length > 0) {
            highlightData.map(n => {
                if (n.quote === props.selectedText) {
                    diff = false;
                }
                return n;
            })
        }

        if (diff) {
            //create payload to add highlight
            const payload = {
                color: HIGHLIGHTED_COLORS[Math.floor(Math.random() * HIGHLIGHTED_COLORS.length)],
                text: props.selectedText,
                title: props.selectedText.substr(0, 50),
                description: props.selectedText,
                link: bookmark?.url,
                collections: bookmark?.collection_gems?.data?.id,
                type: "Highlight",
                box: props.highlightAreas,
                _id: uuidv4(),
                styleClassName: "green-hl",
            }

            dispatch(addHighlight(bookmark?.collection_gems?.data?.id, payload)).then(res => {
                if (res.payload?.data?.id) {
                    const newArr = currentGem?.attributes?.child_gem_id?.data || []
                    const payload = {
                        id: res.payload?.data?.id,
                        attributes: { ...res.payload?.data }
                    }
                    newArr.push(payload);
                    const childGems = {
                        data: newArr
                    }
                    const newObj = { ...currentGem?.attributes, child_gem_id: childGems }

                    dispatch(setCurrentGem({ ...currentGem, attributes: newObj }))
                    formatHighlights(newArr || []);
                }
            })
        }
        props.cancel();
    }


    const renderHighlights = useCallback((props) => {
        return (
        <div>
                {highlightData && Array.isArray(highlightData) && highlightData.map((note) => (
                <React.Fragment key={note.id}>
                    {note.highlightAreas
                        .filter((area) => area.pageIndex === props.pageIndex)
                        .map((area, idx) => (
                            <div
                                key={idx}
                                style={Object.assign(
                                    {},
                                    {
                                        background: note.style,
                                        opacity: 0.4,
                                        cursor: 'pointer'
                                    },
                                    props.getCssProperties(area, props.rotation)
                                )}
                                // onClick={() => jumpToNote(note)}
                                ref={(ref) => {
                                    noteEles.set(note.id, ref);
                                }}
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightData]);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlightContent,
        renderHighlights
    });

    useEffect(() => {
        if(url){
            zoomPluginInstance.zoomTo(1);
        }
    }, [zoomPluginInstance,url])

    if (url === null) return <h4>No Preview Available!</h4>
    if(!url){
        return (
            <div className='py-6 flex justify-center items-center'>
                <h4>No Preview Available</h4>
            </div>

        )
    }


    return (
        <div className='w-full mt-1 h-full'>
            <div className='h-full'>
                <div className='mt-4' ref={exportRef}>
                    <div className="Example__container__document relative group">

                        <Worker 
                        // workerUrl={"/scripts/pdf-worker.min.js"}
                        workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
                        >
                            <div style={{ height: '100vh' }}>
                                <div
                                    style={{
                                        border: '1px solid rgba(0, 0, 0, 0.3)',
                                        display: 'flex',
                                        height: '100%',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            flex: '1 1 0',
                                            overflow: 'auto',
                                        }}
                                    >
                                        <Viewer
                                            fileUrl={url}
                                            plugins={[
                                                defaultLayoutPluginInstance,
                                                highlightPluginInstance,
                                                zoomPluginInstance
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Worker>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RenderPdf