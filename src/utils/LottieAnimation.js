'use client'

import { useEffect, useState } from 'react'
import { useLottie } from 'lottie-react'

const LottieAnimation = ({ url }) => {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        const fetchAnimationData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()

                setAnimationData(data)
            } catch (error) {

                console.error('Error fetching the Lottie animation data:', error)
            }
        }

        fetchAnimationData()

    }, [url])

    const options = {
        animationData,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options)

    return (
        <div>
            {animationData ? View : ''}
        </div>
    );
};

export default LottieAnimation