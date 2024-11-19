"use client"
import axios                        from 'axios'
import { multiClientMiddleware }    from "redux-axios-middleware";
import { message }                  from 'antd';
import { 
    createStore, 
    applyMiddleware }               from "redux";

import rootReducer                  from '@reducers/index';
import { updateScore }              from '@actions/gamification-score';
import { S, F }                     from '@utils/prefix';
import session                      from '@utils/session';
import { GAMIFICATION_ACTIONS }     from '@utils/gamification-actions';
import { SIGNUP }                   from '@actions/membership/action-types';
import { 
    UNAUTHORIZED_ACTION_TYPES, 
    ANALYTICS_ACTION_ARR, 
    PUBLIC_LINKS, 
    PUBLIC_LOCATIONS 
}                                   from "@utils/constants";
import { toggleExceedPopup } from '@actions/app';

const axiosClients = {
    default: {
        client: axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            responseType: "json",
        }),
    },
    commentClient: {
        client: axios.create({
            baseURL: process.env.NEXT_PUBLIC_COMMENT_API_URL,
            responseType: "json",
        }),
    },
    analyticsClient: {
        client: axios.create({
            baseURL: process.env.NEXT_PUBLIC_UMAMI_API_URL,
            responseType: "json",
        })
    }
};

const store = createStore(
    rootReducer,
        applyMiddleware(
            multiClientMiddleware(axiosClients, {
                getRequestOptions: (action) => {
                    action.payload.request.headers = action.payload.request.headers || {};
                    action.payload.request.headers["Access-Control-Allow-Origin"] = "*";
                    if (ANALYTICS_ACTION_ARR.indexOf(action.type) !== -1) {
                        if (session.umamiToken) {
                            action.payload.request.headers[
                                "Authorization"
                            ] = `Bearer ${session.umamiToken}`;
                        }
                    }
                    else if (UNAUTHORIZED_ACTION_TYPES.indexOf(action.type) === -1) {
                        if (session.token !== null) {
                            action.payload.request.headers[
                                "Authorization"
                            ] = `Bearer ${session.token}`;
                        }
                    }
                    return action;
                },
                onComplete: ({ action }) => {
                    const urlIdx            = PUBLIC_LINKS.findIndex((link) => { return action.payload?.request?.responseURL?.includes(link) })
                    const publicLocationIdx = PUBLIC_LOCATIONS.findIndex((link) => { return window.location.href.includes(link) })
                    const actionIdx         = GAMIFICATION_ACTIONS.findIndex((g) => { return S(g.type) === action.type })
                    if (actionIdx !== -1) {
                        const gamification  = GAMIFICATION_ACTIONS[actionIdx]
                        store.dispatch(updateScore(gamification.module));
                    }
                    
                    // DO NOT REMOVE THIS COMMENTED CODE
                    // if (UNAUTHORIZED_ACTION_TYPES.indexOf(action.type) === -1 && urlIdx === -1 && publicLocationIdx === -1 && session.token === null) {
                    //     window.location.href = "/";
                    // }
                    if (action?.error?.response?.data?.error?.status === 429) {
                        store.dispatch(toggleExceedPopup(true, action?.error?.response?.data?.error?.message))
                        // message.error("You have reached the max limit of the requests.")
                    }
                    else if (action?.error?.response?.data?.error?.status === 500 && action?.type === F(SIGNUP)) {
                        message.error("Email or username already taken")
                    }
                    else if (action?.error?.response?.data?.error?.status === 500 && action?.type !== F(SIGNUP)) {
                        message.error("An error occured while processing your request. Please contact with hello@curateit.com or you can raise it with report bugs.")
                    }
                    else if (action?.error?.response?.data?.error?.status === 401) {
                        window.location.href = "/sign-in";
                    }
                    else if (action?.error?.response?.data?.error?.status === 403) {
                        window.location.href = "/403";
                    }
                }
            })
    )
);

export default store