import session from "../../utils/session";

export default class UserStateManager {
    static getUserDetails = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data) {

            state.userData = data;
            state.userTags = data.tags ? [ ...data.tags ] : []
            //Add data to session
            session.setUserId(data?.id)
            session.setUser(data?.username)
            session.setUserProfileImage(data?.profilePhoto);
            session.setCollectionId(data?.unfiltered_collection)
            session.setBioCollectionId(data?.bio_collection)
            session.setBioContactCollectionId(data?.bio_contact_collection)
            session.setOpenPagesInSession(data?.openPagesIn)
            session.setEditPagesInSession(data?.editPagesIn)
            session.setGemOnClickEventInSession(
              data.user?.preferences?.gemOnClickEvent || "gem view"
            );
            session.setEmailAddress(data?.email)
        }
        return state;
    };

    static updateUserDetails = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data) {
            state.userData = data;
        }
        return state;
    };

    static updateUserTags = (prevState, action) => {
        const state       = { ...prevState }
        const { tags }    = action

        if (Array.isArray(tags)) {
            state.userTags = [ ...state.userTags, ...tags ]
        }
        else {
            state.userTags = [ ...state.userTags, tags ]
        }
        return state
    }
}
