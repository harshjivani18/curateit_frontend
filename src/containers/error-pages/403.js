"use client";

import React                from "react";
import { useRouter }        from "next/navigation";

const ForbiddenPage = () => {
    const router    = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img className="h-50 w-50 my-0 mx-auto" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`} alt="Cloud ellipse icons" data-current-src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}></img>
            <h1 className="text-4xl font-bold text-gray-800">403 Forbidden</h1>
            <p className="text-gray-600 text-lg">You don't have permission to access this page.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push("/")}>Back to home</button>
        </div>
    )
}

export default ForbiddenPage;
