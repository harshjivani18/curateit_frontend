import * as ActionTypes from './action-types';

export const getAllComment = (payload) => (
    {
        type: ActionTypes.GET_ALL_COMMENTS,
        payload: {
            client: 'commentClient',
            request: {
                url: `/api/comments?perPage=${payload?.per_page}&pageName=${payload?.type}&pageId=${payload?.page_id}&page=${payload.pageNo}&skip=${payload?.skip}`,
                method: "get"
            }
        }
    });

export const getMoreComment = (payload) => (
    {
        type: ActionTypes.GET_MORE_COMMENTS,
        payload: {
            client: 'commentClient',
            request: {
                url: `/api/comments?perPage=${payload?.per_page}&pageName=${payload?.type}&pageId=${payload?.page_id}&page=${payload.pageNo}&skip=${payload?.skip}`,
                method: "get"
            }
        }
    });

    export const addComment = (payload) => {
        const { floatingCommentData = {} } = payload; // Destructuring with a default value
    
        return {
            type: ActionTypes.ADD_COMMENT,
            payload: {
                client: 'commentClient',
                request: {
                    url: `/api/comments`,
                    method: "post",
                    data: {
                        ...payload,
                        floatingCommentData, // This will contain the value from payload or an empty object
                    },
                },
            },
        };
    };
    

export const getSingleComment = (payload) => (
    {
        type: ActionTypes.GET_SINGLE_COMMENTS,
        payload: {
            client: 'commentClient',
            request: {
                url: `/api/comments/${payload?.comment_id}`,
                method: "get",
            }
        }
    });

export const showCommentReplies = (payload) => (
    {
        type: ActionTypes.SHOW_REPLIES,
        payload: {
            client: 'commentClient',
            request: {
                url: `/api/comments/replies/${payload?.comment_id}?page=0&perPage=1000`,
                method: "get",
            }
        }
    });


export const addCommentReply = (payload) => (
    {
        type: ActionTypes.ADD_COMMENT_REPLY,
        payload: {
            client: 'commentClient',
            request: {
                url: `/api/comments/reply-to/${payload?.comment_id}`,
                method: "post",
                data: payload
            }
        }
    });


export const editComment = (payload) => (
    {
        type: ActionTypes.EDIT_COMMENT,
        payload: {
            client: 'commentClient',
            request: {
                url: `/api/comments/${payload?.comment_id}/${payload?.user_id}`,
                method: "patch",
                data: payload
            }
        }
    });

export const deleteComment = (payload) => (
    {
        type: ActionTypes.DELETE_COMMENT,
        commentId: payload?.comment,
        payload: {
            client: 'commentClient',
            request: {
                url: `/api/comments/${payload?.comment_id}/${payload?.user_id}`,
                method: "delete",
            }
        }
    });

export const removeComment = (payload) => {
    return (
    {
        type: ActionTypes.REMOVE_COMMENT,
        payload: payload
    })};


export const voteComment = (payload) => (
    {
        type: ActionTypes.VOTE_COMMENT,
        payload: {
            client: 'commentClient',
            request: {
                url: `/api/comments/upvotes-downvotes-comment/${payload?.comment_id}?userId=${payload?.user_id}`,
                method: "patch",
                data: payload
            }
        }
    });
