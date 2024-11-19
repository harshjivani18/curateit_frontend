import { S, } from "../../utils/prefix";
import * as ActionTypes from "../../actions/comment/action-types";
import CommentStateManager from "./state-manager";

const INITIAL_STATE = {
    comments:[],
    totalComments: 0
}


export default function commentState(state = INITIAL_STATE, action) {
    switch (action.type) {
        case S(ActionTypes.GET_ALL_COMMENTS):
            return CommentStateManager.getAllComments(state, action);
        case S(ActionTypes.GET_MORE_COMMENTS):
            return CommentStateManager.getMoreComments(state, action);
        case S(ActionTypes.ADD_COMMENT):
            return CommentStateManager.addComments(state, action);
        case S(ActionTypes.ADD_COMMENT_REPLY):
            return CommentStateManager.addCommentReply(state, action);
        case S(ActionTypes.SHOW_REPLIES):
            return CommentStateManager.showCommentReplies(state, action);
        case S(ActionTypes.VOTE_COMMENT):
            return CommentStateManager.voteComment(state, action);
        case ActionTypes.REMOVE_COMMENT:
            return CommentStateManager.removeComment(state, action);
        default:
            return state;
    }
}