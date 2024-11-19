

export default class TagStateManager {
    static getPlanServiceSuccess = (prevState, action) => {
        const state = { ...prevState };
        const data  = action.payload?.data?.data;
        if (data) {
            state.planService = data;
        }
        return state;
    }

}