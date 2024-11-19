// import WebHighlighter from "@containers/features/web-highlighter/WebHighlighter"
import dynamic from "next/dynamic"
const WebHighlighter = dynamic(() => import("@containers/features/web-highlighter/WebHighlighter"), { ssr: false })

export const metadata = {
    title: 'Best Highlighter Chrome Extension for PDF\'s & Webpage | CurateIt',
    description: 'Elevate your reading experience with CurateIt, the top highlighter Chrome extension for PDFs and webpages. Effortlessly highlight and curate important content.',
}

const WebHighlighterPage = () => {

    return (

        <WebHighlighter />

    )

}

export default WebHighlighterPage