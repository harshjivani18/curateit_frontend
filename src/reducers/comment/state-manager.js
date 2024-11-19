export default class CommentStateManager {
    static getAllComments = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data) {
            state.comments = data?.data?.replies || [];
            state.totalComments = data?.data?.totalCount || 0;
        }
        return state;
    };


    static getMoreComments = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data) {
            state.comments = [...state.comments, ...data?.data?.replies];
            state.totalComments = data?.data?.totalCount || 0;
        }
        return state;
    };


    static showCommentReplies = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data?.data && data?.data?.replies && Array.isArray(data?.data?.replies) && data?.data?.replies.length > 0) {
            let parent_id = data?.data?.replies[0].parent_comment_id;
            const index = state.comments.findIndex((data) => data?._id.toString() === parent_id.toString());
            if (index !== -1) {
                const newComments = state.comments.map((comt, i) => {
                    if (i === index) {
                        return { ...comt, replies: data?.data?.replies }
                    } else {
                        return comt;
                    }
                })
                state.comments = [...newComments];
            }

        }
        return state;
    };


    static addComments = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data?.data) {
            const newArr = [data?.data, ...state.comments];
            state.comments = newArr;
            state.totalComments = state.totalComments + 1;
        }
        return state;
    };



    static addCommentReply = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data?.data) {
            const index = state.comments.findIndex((comt) => comt?._id.toString() === data?.data?.parent_comment_id.toString());
            if (index !== -1) {
                let replies = state.comments[index].replies;
                const newArr = [...replies, data?.data];
                const newComments = state.comments.map((comt, i) => {
                    if (i === index) {
                        return { ...comt, replies: newArr }
                    } else {
                        return comt;
                    }
                })
                state.comments = newComments;
                state.totalComments = state.totalComments + 1;
            }
        }
        return state;
    };


    static voteComment = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data?.data) {
            if (data?.data?.parent_comment_id) {
                const parentIndex = state.comments.findIndex((comt) => comt?._id.toString() === data?.data?.parent_comment_id.toString());
                if (parentIndex !== -1) {
                    const index = state.comments[parentIndex].replies.findIndex((comt) => comt?._id.toString() === data?.data?._id.toString());
                    if (index !== -1) {

                        state.comments = state.comments.map((prCom, i) => {
                            if (parentIndex === i) {
                                const replies = prCom.replies.map((rep, idx) => {
                                    if (idx === index) {
                                        return { ...rep, upvotes: data?.data?.upvotes, downvotes: data?.data?.downvotes }
                                    } else {
                                        return rep
                                    }
                                })
                                return { ...prCom, replies }
                            } else {
                                return prCom
                            }
                        })
                    }
                }
            } else {
                const index = state.comments.findIndex((comt) => comt?._id.toString() === data?.data?._id.toString());
                if (index !== -1) {
                    state.comments = state.comments.map((mainCom, i) => {
                        if (index === i) {
                            return { ...mainCom, upvotes: data?.data?.upvotes, downvotes: data?.data?.downvotes }
                        } else {
                            return mainCom
                        }
                    })
                }
            }
        }
        return state;
    };


    static removeComment = (prevState, action) => {
        const state = { ...prevState };
        const deletedComment = action.payload;
        if (deletedComment?._id) {
            if (deletedComment?.parent_comment_id) {
                const parentIndex = state.comments.findIndex((comt) => comt?._id.toString() === deletedComment.parent_comment_id.toString());
                if (parentIndex !== -1) {
                    const index = state.comments[parentIndex].replies.findIndex((comt) => comt?._id.toString() === deletedComment?._id.toString());
                    if (index !== -1) {
                        state.comments = state.comments.map((prCom, i) => {
                            if (parentIndex === i) {
                                const newReplies = [...prCom.replies];
                                newReplies.splice(index, 1);
                                return { ...prCom, replies: newReplies }
                            } else {
                                return prCom
                            }
                        })
                    }
                }
            } else {
                const index = state.comments.findIndex((comt) => comt?._id.toString() === deletedComment._id.toString());
                if (index !== -1) {
                    const comments = [...state.comments];
                    comments.splice(index, 1);
                    state.comments = comments;
                }
            }
            state.totalComments = state.totalComments - 1;

        }
        return state;
    }
}
