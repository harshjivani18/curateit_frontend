"use client"

import { Provider }         from "react-redux"
import store                from "@store/index"
// import CookieConsent        from "@components/cookie/CookieConsent"

const MainStoreProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default MainStoreProvider