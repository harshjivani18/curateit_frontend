// import TabsManager from "@containers/features/tabs-manager/TabsManager"
import dynamic from "next/dynamic"
const TabsManager = dynamic(() => import("@containers/features/tabs-manager/TabsManager"), { ssr: false })

export const metadata = {
    title: 'Best Tab Management & Session Extension for Chrome | CurateIt',
    description: 'Optimize your Chrome browsing with top-notch tab management and session extension. Explore CurateIt for a seamless online experience.',
}

const TabsManagerPage = () => {

    return (

        <TabsManager />
    )


}
export default TabsManagerPage