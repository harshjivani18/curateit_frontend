import session                  from "@utils/session";

export default class MembershipStateManager {
    static loginSuccess = (prevState, action) => {
        const state = { ...prevState };
        const data = action.payload.data;
        
        if (data) {
            state.loginData = data;
        }
        const token = action.payload.data.jwt;
        if (token !== undefined) {
            session.setToken(token);
            session.setUserId(data.user?.id)
            session.setUser(data.user?.username)
            session.setUserProfileImage(data.user?.profilePhoto)
            session.setCollectionId(data.user?.unfiltered_collection)
            session.setBioCollectionId(data.user?.bio_collection)
            session.setBioContactCollectionId(data.user?.bio_contact_collection)
            session.setOpenPagesInSession(data.user?.openPagesIn)
            session.setEditPagesInSession(data.user?.editPagesIn)
            session.setGemOnClickEventInSession(
              data.user?.preferences?.gemOnClickEvent || "gem view"
            );
            session.setEmailAddress(data.user?.email)
            session.setFirstname(data.user?.firstname)
            session.setLastname(data.user?.lastname)
            session.setIsUserConfirmed(data.user?.confirmed)
            session.setIsInternalUser(data.user?.isInternalUser)
            session.setWebappSidebar(data?.user?.webapp_sidebar_arr)

            // session.setMode(data.user?.preferences?.theme?.mode)
        }else{
            const tokken = data.jwt
            state.loginData = data
            session.setUserId(data.user?.id)
            session.setToken(tokken);
            session.setUser(data.user?.username)
            session.setUserProfileImage(data.user?.profilePhoto);
            session.setCollectionId(data.user?.unfiltered_collection)
            session.setBioCollectionId(data.user?.bio_collection)
            session.setBioContactCollectionId(data.user?.bio_contact_collection)
            session.setOpenPagesInSession(data.user?.openPagesIn)
            session.setEditPagesInSession(data.user?.editPagesIn)
            session.setGemOnClickEventInSession(
              data.user?.preferences?.gemOnClickEvent || "gem view"
            );
            session.setEmailAddress(data.user?.email)
            session.setFirstname(data.user?.firstname)
            session.setLastname(data.user?.lastname)
            session.setIsUserConfirmed(data.user?.confirmed)
            session.setIsInternalUser(data.user?.isInternalUser)
            session.setWebappSidebar(data?.user?.webapp_sidebar_arr)
            // session.setMode(data.user?.preferences?.theme?.mode)
        }
        return state;
    };

    static signupSuccess = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data) {
            state.signupData = data;
        }
        const token = action.payload.data.jwt;
        session.setToken(token);
        session.setUser(data.user?.username)
        session.setCollectionId(data.user?.unfiltered_collection)
        session.setBioCollectionId(data.user?.bio_collection)
        session.setBioContactCollectionId(data.user?.bio_contact_collection)
        session.setUserId(data.user?.id)
        session.setOpenPagesInSession(data.user?.openPagesIn)
        session.setEditPagesInSession(data.user?.editPagesIn)
        session.setGemOnClickEventInSession(
          data.user?.preferences?.gemOnClickEvent || "gem view"
        );
        session.setEmailAddress(data.user?.email)
        session.setFirstname(data.user?.firstname)
        session.setLastname(data.user?.lastname)
        session.setIsUserConfirmed(data.user?.confirmed)
        session.setIsInternalUser(data.user?.isInternalUser)
        session.setIsInternalUser(data.user?.isInternalUser)
        session.setWebappSidebar(data?.user?.webapp_sidebar_arr)

        return state;
    };

    static setUserSuccess = (prevState, action) => {
        const state = { ...prevState };
        const { data } = action.payload;
        if (data) {
            state.signupData = {
                ...state.signupData,
                unfiltered_collection: data.unfiltered_collection
            };
        }
        session.setCollectionId(data.unfiltered_collection)
        session.setBioCollectionId(data.bio_collection)
        session.setBioContactCollectionId(data.bio_contact_collection)
        // session.setIsUserConfirmed(data.confirmed)
        return state;
    }
    
}