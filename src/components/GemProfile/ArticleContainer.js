'use client'
// import dynamic from 'next/dynamic';
// const Highlighter = dynamic(async () => await import("web-highlighter"), { ssr: false });
import "./articleContainer.css"
import React, { 
    useEffect, 
    useState, 
    useRef, 
    useCallback 
}                                       from 'react'
import { Spin }                         from 'antd'
import { useDispatch, useSelector }     from 'react-redux'
import moment                           from 'moment'

import { 
    HIGHLIGHTED_COLORS, 
    getDomainFromURL 
}                                       from "@utils/constants"
import { loadHighlighter }              from "@utils/load-quill" 

import { 
    addHighlight, 
    fetchTextToSpeech, 
    setCurrentGem 
}                                       from '@actions/gems'
// import Highlighter from 'web-highlighter';


const ArticleContainer = ({ bookmark, article, readArticle, loading,setReadArticle,setting,fontSize,fontFamily,textColor,gemPublicView= ''}) => {
    let highlighter = null;
    const currentGem = useSelector(state => state.gems.currentGem);
    const allHighlights = useSelector(state => state.gems.highlights);
    const dispatch = useDispatch()
    const audioRef = useRef();
    const articleRef = useRef();
    const progressRef = useRef();
    const firstLoad = useRef(true)
    const intervalTime = useRef(null);
    const [audioPlaying, setAudioPlying] = useState(false);
    const [totalWords, setTotalWords] = useState(0);
    const [audioTime, setAudioTime] = useState("0");
    const [audioCurrentTime, setAudioCurrentTime] = useState("00:00");
    const [audioProgress, setAudioProgress] = useState(0);
    const [audioSpeed, setAudioSpeed] = useState(1);
    const [audioUrl, setAudioUrl] = useState("");
    const [fetchingAudio, setFetchingAudio] = useState(false);
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);
    // const [setting, setSetting] = useState(DEFAULT_STATUS);
    // const [fontSize, setFontSize] = useState(1);
    // const [fontFamily, setFontFamily] = useState("sans-font");
    // const [textColor, setTextColor] = useState("#000000");
    const [highlightText, setHighlightText] = useState("");
    const [highlighterStyle, setHighlighterStyle] = useState({ display: "none" });
    const [boxDetails, setBoxDetails] = useState({});

    useEffect(() => {
        function hideMenu() { 
            if (window.getSelection().toString() === ""){
                setHighlighterStyle({ display: "none" }); 
            }
        }
        document.addEventListener('click', hideMenu);
        return() => document.removeEventListener('click', hideMenu);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        const getCall = async () => {
            if (!highlighter) {
                highlighter = await loadHighlighter();
            }
            if(allHighlights.length > 0){
                allHighlights.forEach(s => {
                    if(s?.media?.details?.id){
                        highlighter.fromStore(s?.media?.details.startMeta, s?.media?.details.endMeta, s?.media?.details.id, s?.media?.details.text)
                        if (s?.media?.color?.className){
                            highlighter.addClass(s?.media?.color?.className, s?.media?.details.id)
                        }
                    }
                })
            }
        }
        getCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allHighlights]);


    function formatTime(currentTime) {
        let currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime - currentMinutes * 60)

        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes
        }

        return currentMinutes + ":" + currentSeconds
    }

    const fetchAudio = () => {
        setFetchingAudio(true);
        const body = {
            text: article.textContent,
            url: bookmark?.attributes?.url,
        }

        !gemPublicView && dispatch(fetchTextToSpeech(body)).then(res => {
            if (res?.payload?.data?.data?.audio_url) {
                setAudioUrl(res?.payload?.data?.data?.audio_url);
                setFetchingAudio(false);
            } else {
                handleClosePlayer();
                setFetchingAudio(false);
            }
        });
    }

    useEffect(() => {
        if(!firstLoad.current){
            if (showAudioPlayer) {
                handleClosePlayer();
            } else {
                setShowAudioPlayer(true)
                if (!audioUrl) {
                    fetchAudio();
                }
            }
        }else{
            firstLoad.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readArticle])

    useEffect(() => {
        //Update current time
        if (audioPlaying) {
            intervalTime.current = setInterval(() => {
                setAudioProgress(audioRef?.current?.currentTime)
                setAudioCurrentTime(formatTime(audioRef?.current?.currentTime));
            }, 500)
        } else {
            setAudioCurrentTime(formatTime(audioRef?.current?.currentTime));
            clearInterval(intervalTime.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioPlaying])


    useEffect(() => {
        if (bookmark?.attributes?.media_type === 'Article' && article.content) {
            setTotalWords(article.content.split(" ").length)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article])

    const onLoadedMetadata = useCallback(() => {
        progressRef.current.max = audioRef.current.duration
        setAudioProgress(audioRef.current.currentTime || 0)
        setAudioTime(formatTime(audioRef.current.duration))
        setAudioCurrentTime(formatTime(audioRef.current.currentTime));
    }, []);

    const handleDownloadAudio = () => {
        if (!audioUrl) return;
        window.open(audioUrl);
    }

    const handleClosePlayer = () => {
        if (audioPlaying) {
            audioRef.current.pause();
            setAudioPlying(false);
        }

        setShowAudioPlayer(false);
    }

    const handleAudioSpeed = () => {
        let newSpeed = 1
        if (audioSpeed === 1) {
            setAudioSpeed(1.5)
            newSpeed = 1.5
        } else if (audioSpeed === 1.5) {
            newSpeed = 2.0
            setAudioSpeed(2.0)
        } else if (audioSpeed === 2.0) {
            newSpeed = 0.5
            setAudioSpeed(0.5)
        } else {
            newSpeed = 1
            setAudioSpeed(1)
        }
        audioRef.current.playbackRate = newSpeed
    }

    const handleAudioPlayPause = () => {
        if (audioPlaying) {
            //Pause audio
            audioRef.current.pause();
            setAudioPlying(false);
        } else {
            //Play audio
            audioRef.current.play()
            setAudioPlying(true);
        }
    }

    //On update progress bar
    const handleUpdateProgress = (e) => {
        setAudioProgress(e.target.value)
        if (audioPlaying) {
            clearInterval(intervalTime.current)
            audioRef.current.currentTime = e.target.value;
            setAudioProgress(e.target.value)
            setAudioCurrentTime(formatTime(e.target.value));
            audioRef.current.play()
        } else {
            audioRef.current.currentTime = e.target.value;
            setAudioProgress(progressRef.current.value)
            setAudioCurrentTime(formatTime(progressRef.current.value));
        }
    }

    const handleHighlight = () => {
        const selectedArea = window.getSelection();
        if (selectedArea.toString()){
            const bound = selectedArea.getRangeAt(0).getBoundingClientRect();
            const conatinerBound = articleRef.current.getBoundingClientRect();

            setHighlightText(selectedArea.toString());
            setBoxDetails(bound);
            const styles = {
                display: "flex",
                top: bound.top + articleRef.current.scrollTop - conatinerBound.top - 40,
                left: bound.left - conatinerBound.left
            }
            setHighlighterStyle(styles);
        }
    }
    
    const handleAddHighlight = (color) => {
        if (!highlightText){
            setHighlighterStyle({ display: "none" });
            window.getSelection()?.removeAllRanges();
            return
        }

        // highlighter.run();
        const s = window.getSelection()
        const tRange = s.getRangeAt(0)

        

        const details = highlighter.fromRange(tRange)
        highlighter.addClass(color?.className, details.id)

        const payload = {
            color: color,
            text: highlightText,
            title: highlightText.toString().substr(0, 50),
            description: highlightText,
            link: bookmark?.attributes?.url,
            collections: bookmark?.attributes?.collection_gems?.data?.id,
            type: "Highlight",
            box: boxDetails,
            _id: details?.id,
            styleClassName: color?.className,
            details,
        }

        dispatch(addHighlight(bookmark?.attributes?.collection_gems?.data?.id, payload)).then(res => {
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
            }
        })

        setHighlighterStyle({ display: "none" });
        setHighlightText("");
        setBoxDetails({});
        window.getSelection()?.removeAllRanges();
    }

    return (
        <>
            {loading ?
                <div className="spinDiv">
                    <Spin size='middle' tip='Loading...' />
                </div> :
                article?.content ?
                <>  
                    {
                    fetchingAudio ? '' :
                    <div className='flex items-center gap-2 text-xs mb-2'>
                        <span className='truncate truncate inline-block text-[#1890ff] hover:text-[#40a9ff] underline cursor-pointer' onClick={() => window.open(bookmark?.attributes?.url)}>{`${getDomainFromURL(bookmark?.attributes?.url)} |`}</span>
                        {bookmark?.attributes?.creatorName ? <span className='truncate inline-block'>{bookmark?.attributes?.creatorName ? `by ${bookmark?.attributes?.creatorName} |` : ''}</span> : ''}
                        <span className='truncate inline-block'>{bookmark?.attributes?.publishedAt ? `${moment(bookmark?.attributes?.publishedAt).format('DD MMM YYYY')} |`: ''}</span>
                        <span className='inline-block'>{totalWords} words</span>
                        {audioTime !== '0' && <span className='inline-block'>{audioTime} read</span>}
                        <button onClick={() => setReadArticle(prev => !prev)} className='h-6 w-6 rounded-md bg-white shadow flex justify-center items-center'>
                            <img className="h-5 w-5" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/play-button-outline.svg`} alt="play button icon" />
                        </button>
                    </div>
                    }
                    
                    <div className='relative'>
                        {/* Sidebar options */}
                        <div 
                            ref={articleRef}
                            style={{ fontSize: fontSize + 'rem' }}
                            className={`relative max-h-[70vh] overflow-auto  custom-scroll
                                        ${setting.dark_mode ? "dark-mode" : ""}
                                        ${fontFamily} 
                                        `}>
                                <h2 style={{ color: textColor }} className={`py-2 text-[1.5em] font-semibold ${setting.dark_mode && "text-white"}`}>{article?.title}</h2>
                                <div onMouseUp={handleHighlight} style={{ color: textColor }} dangerouslySetInnerHTML={{ __html: article?.content }} />
                                <div style={highlighterStyle} className='absolute justify-start items-center z-50 px-1 gap-1 h-8 bg-white'>
                                    {HIGHLIGHTED_COLORS.map( color => (
                                        <button key={color?.id} onClick={() => handleAddHighlight(color)} className={`h-5 w-5 rounded-full bg-[${color.bg}] `}></button>
                                    ))}
                                </div>
                        </div>
                        {/* Media Player */}
                        {showAudioPlayer &&
                            <div id='media-player' className={`${fetchingAudio ? 'justify-center' : ''} media-player-container`}>
                                {fetchingAudio ? (
                                    <div className='flex justify-center items-center'>
                                        <Spin size='small' tip="Loading audio.." />
                                    </div>
                                ) : (
                                    <>
                                        <audio
                                            controls
                                            style={{ display: "none" }}
                                            ref={audioRef}
                                            id="audio-player-html"
                                            onLoadedMetadata={onLoadedMetadata}
                                        >
                                            <source src={audioUrl} type="audio/mpeg" />
                                        </audio>
                                        <button id='close-player-handler' className='close-player' onClick={handleClosePlayer}>
                                            <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/close.svg`} alt='Close button icon' />
                                        </button>
                                        <div id='drag-controller' className='info-container'>
                                            <div>
                                                <span>Word</span>
                                                <span className='info-text'>{totalWords}</span>
                                            </div>
                                            <div>
                                                <span>Time</span>
                                                <span id='audio-total-duration' className='info-text'>{audioTime}</span>
                                            </div>
                                        </div>
                                        <div className='player-section'>
                                            <div className='player-control'>
                                                <button
                                                    className='audio-ctrl-btn'
                                                    id='audio-ctrl-btn'
                                                    onClick={handleAudioPlayPause}
                                                >
                                                    {audioPlaying ?
                                                        <img id="pause-ctrl-icon" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/pause-circle-fill.svg`} alt='Pause button icon' />
                                                        :
                                                        <img id="play-ctrl-icon" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/play-button-solid.svg`} alt='Play button icon' />
                                                    }

                                                </button >
                                                <span id='audio-current-time'>{audioCurrentTime}</span>
                                            </div>
                                            <div className='progress-box'>
                                                <input
                                                    className='px-0'
                                                    onChange={handleUpdateProgress}
                                                    ref={progressRef}
                                                    type='range'
                                                    value={audioProgress}
                                                />
                                            </div>
                                            <div className='player-control'>
                                                <button onClick={handleDownloadAudio}>
                                                    <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/download-alt.svg`} alt='Download audio file icon' />
                                                </button>
                                                <button id='audio-playback-control' current-speed={audioSpeed} onClick={handleAudioSpeed}>
                                                    <span id='audio-playback-speed' style={{ fontSize: "20px" }}>{audioSpeed}x</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>}
                    </div>
                </> : (
                    <div className='py-8'>
                        <span className='text-center'>Article not found</span>
                    </div>
                )
                }
        </>
    )
}

export default ArticleContainer