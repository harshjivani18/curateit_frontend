import * as ActionTypes from "./action-types";


export const newpass = (newurl,password,confirmPassword) => ({
  type: ActionTypes.NEW_PASS,
  payload: {
    request: {
      url: `/api/auth/reset-password`,
      method: "post",
      data: {
        code:newurl,
        password: password,
        passwordConfirmation: confirmPassword
      }
    }
  }
});


export const errorMsg = (data) => (
  {
    type: ActionTypes.ERROR_MSG,
    payload: {
      data
    }
  }
)
export const disableMsg = (data) => (
  {
    type: ActionTypes.DISABLE_MSG,
    payload: {
      data
    }
  }
)

export const successMsg = (data) => (
  {
    type: ActionTypes.SUCCESS_MSG,
    payload: {
      data
    }
  }
)

export const fetchLogin = (email, password) => ({
  type: ActionTypes.FETCH_LOGIN,
  payload: {
    request: {
      url: `/api/auth/local`,
      method: "post",
      data: {
        identifier: email,
        password: password
      }
    }
  }
});

export const setSocialLogin = (data) => (
  {
    type: ActionTypes.SET_SOCIAL_LOGIN,
    payload: {
      data
    }
  }
)

export const emailVerification = (email) => ({
  type: ActionTypes.EMAIL_VERIFICATION,
  payload: {
    request: {
      url: `https://emailverifier.reoon.com/api/v1/verify?email=${email}&key=${process.env.NEXT_PUBLIC_REOON_API_KEY}&mode=quick`,
      method: "get",
      data: {
        email: email,
      }
    }
  }
});

export const signup = (lastn, email, password, fname, lname) => ({
  type: ActionTypes.SIGNUP,
  payload: {
    request: {
      url: `/api/auth/local/register`,
      method: "post",
      data: {
        username: lastn,
        email: email,
        password: password,
        firstname: fname,
        lastname: lname
      }
    }
  }
});

export const forgot = (email) => ({
  type: ActionTypes.FORGOT,
  payload: {
    request: {
      url: `/api/auth/forgot-password`,
      method: "post",
      data: {
        email: email,
      }
    }
  }
});

export const setDefaultCurateit = () => ({
  type: ActionTypes.SET_USER_DEFAULT_CURATEIT,
  payload: {
    request: {
      url: `/api/default-collection`,
      method: "post"
    }
  }
})

export const setUserInformation = () => ({
  type: ActionTypes.SET_AFTER_USER_CREATE_OPERATION,
  payload: {
    request: {
      url: `/api/update-userdata`,
      method: "post"
    }
  }
})

export const getInstaAccessToken = (code) => ({
  type: ActionTypes.INSTA_ACCESS_TOKEN,
  payload: {
    request: {
      url: `/api/set-insta-access-token`,
      method: "post",
      data: {
        code: code,
      }
    }
  }
});

export const saveInstaWallData = (data) => ({
  type: ActionTypes.SAVE_INSTA_WALL,
  payload: {
    request: {
      url: `/api/insta-wall`,
      method: "post",
      data: data
    }
  }
});

export const getInstaWallData = () => ({
  type: ActionTypes.GET_INSTA_WALL,
  payload: {
    request: {
      url: `/api/insta-wall`,
      method: "get",
    }
  }
});