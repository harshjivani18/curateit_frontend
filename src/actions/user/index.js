import session from "@utils/session";
import * as ActionTypes from "./action-types";
const headers = {
  'Content-Type': 'multipart/form-data',
}

export const getOtherUserDetails = (username) => ({
    type: ActionTypes.FETCH_OTHER_USER_DETAILS,
    payload: {
      request: {
        url: `/api/user?username=${username}`,
        method: "get"
      }
    }
  });
  
  export const UploadProfileCoverS3Link = (data) => ({
    type: ActionTypes.UPLOAD_PROFILE_COVER,
    payload: {
      request: {
        url: `/api/upload?isProfileCover=true`,
        method: "post",
        headers,
        data
      }
    }
  });

  export const UploadProfileCoverUnsplashS3Link = (link) => ({
    type: ActionTypes.UPLOAD_PROFILE_COVER_UNSPLASH,
    payload: {
      request: {
        url: `/api/upload?fileLink=${link}&isProfileCover=true`,
        method: "post",
        headers,
      }
    }
  });

  export const updateUser = (data) => ({
    type: ActionTypes.UPDATE_USER,
    payload: {
      request: {
        url: `/api/users/${session.userId}`,
        method: "put",
        data
      }
    }
  })

  export const uploadProfileImage = (data) => ({
    type: ActionTypes.UPLOAD_PROFILE_IMAGE,
    payload: {
      request: {
        url: `/api/upload?isProfile=true`,
        method: "Post",
        data
      }
    }
  })

  export const deleteAccount = (data) => ({
  type: ActionTypes.DELETE_ACCOUNT,
  payload: {
    request: {
      url: `/api/users/${session.userId}`,
      method: "delete",
      data,
    },
  },
})


export const updateUserTags = (tags) => ({
  type: ActionTypes.UPDATE_USER_TAGS,
  tags
}) 

export const getUserDetails = () => ({
  type: ActionTypes.FETCH_USER_DETAILS,
  payload: {
    request: {
      url: `/api/users/me?populate=tags`,
      method: "get"
    }
  }
});

export const changePassword = (data) => (
  {
    type: ActionTypes.CHANGE_PASSWORD,
    payload: {
      request: {
        url: `/api/auth/change-password`,
        method: "post",
        data
      }
    }
  });

export const deleteAllData = () => (
  {
    type: ActionTypes.DELETE_ALL_DATA,
    payload: {
      request: {
        url: `/api/delete-userdata`,
        method: "delete"
      }
    }
});

export const checkUserNameExists = (username) => ({
    type: ActionTypes.CHECK_USERNAME_EXISTS,
    payload: {
      request: {
        url: `/api/username?username=${username}`,
        method: "get"
      }
    }
});

export const socialLoginReferralTrack = (data) => (
  {
    type: ActionTypes.SOCIAL_LOGIN_REFERRAL_TRACK,
    payload: {
      request: {
        url: `/api/social-referral-track`,
        method: "post",
        data
      }
    }
  });