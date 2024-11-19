import * as ActionTypes from './action-types';

export const addPersona = (persona) => ({
    type: ActionTypes.ADD_PERSONA,
    payload: {
        request: {
            method: 'POST',
            url: '/api/personas',
            data: persona
        }
    }
})

export const addVoice = (voice) => ({
    type: ActionTypes.ADD_VOICE,
    payload: {
        request: {
            method: 'POST',
            url: '/api/voices',
            data: voice
        }
    }
})

export const addBrand = (persona) => ({
    type: ActionTypes.ADD_BRAND,
    payload: {
        request: {
            method: 'POST',
            url: '/api/ai-brands?populate=*',
            data: { data: persona }
        }
    }
})

export const editBrand = (persona, brandId) => ({
    type: ActionTypes.EDIT_BRAND,
    payload: {
        request: {
            method: 'PUT',
            url: `/api/ai-brands/${brandId}?populate=*`,
            data: { data: persona }
        }
    }
})

export const deleteBrand = (id) => ({
    type: ActionTypes.DELETE_BRAND,
    payload: {
        request: {
            method: 'DELETE',
            url: `/api/ai-brands/${id}`
        }
    },
    meta: {
        id
    }
})

export const fetchPersonas = () => ({
    type: ActionTypes.FETCH_PERSONAS,
    payload: {
        request: {
            method: 'GET',
            url: '/api/get-user-personas'
        }
    }
})

export const fetchVoices = () => ({
    type: ActionTypes.FETCH_VOICES,
    payload: {
        request: {
            method: 'GET',
            url: '/api/get-user-voices'
        }
    }
})

export const getMyPrompts = () => ({
    type: ActionTypes.GET_MY_PROMPTS,
    payload: {
        request: {
            method: 'GET',
            url: '/api/media-type?mediatype=Ai Prompt'
        }
    }
})

export const getBrandPrompts = () => ({
    type: ActionTypes.GET_BRAND_PROMPT,
    payload: {
        request: {
            method: 'GET',
            url: '/api/get-brand-prompts'
        }
    }
})

export const fetchPublicPromptGems = () => ({
    type: ActionTypes.GET_PUBLIC_PROMPT_GEMS,
    payload: {
        request: {
            method: 'GET',
            url: '/api/fetch-public-prompts'
        }
    }
})

export const fetchChatAudio = (text, voice, isDemoLink=false) => ({
    type: ActionTypes.FETCH_CHAT_AUDIO,
    payload: {
        request: {
            method: 'POST',
            url: '/api/convert-chat-to-audio',
            data: { text, voice, isDemoLink }
        }
    }
})