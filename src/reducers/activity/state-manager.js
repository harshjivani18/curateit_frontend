export default class ActivityStateManager {
    static getLeaderBoard = (prevState, action) => {
        const state     = { ...prevState };
        const { page }  = action.meta.previousAction.meta
        const {data}    = action.payload;
        if (data) {
            const p     = parseInt(page);
            const startRank     = (p - 1) * 100 + 1;
            state.leaderBoard   = data.message?.filter(item => item.author).map((item,i) => {
                return {
                    ...item,
                    rank: i + startRank
                }
            }) || [];
            state.leaderBoardCount = data.totalCount || 0;
        }
        return state;
    }; 

    static getActivityLogs = (prevState, action) => {
        const state = { ...prevState };
        const {data} = action.payload.data;
        if (data) {
            state.activityLogs = data.activities || [];  
            state.activityTotalCount = data.totalCount || 0;
        }
        return state;
    };
}