// import TextExplander from "@containers/features/text-expander/TextExpander"
import dynamic from "next/dynamic"
const TextExplander = dynamic(() => import("@containers/features/text-expander/TextExpander"), { ssr: false })

export const metadata = {
    title: 'Free AI Auto Text Expander Extension for Google Chrome | CurateIt',
    description: 'Optimize your workflow with the AI Auto Text Expander Extension for Google Chrome. CurateIt assists in automating text entry for a smoother experience.',
}

const TextExpanderPage = () => {

    return (

        <TextExplander />
    )


}
export default TextExpanderPage