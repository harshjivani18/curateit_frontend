import * as ActionTypes         from "./action-types"

export const login = (email, password) => ({
    type: ActionTypes.LOGIN,
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
})

export const resendVerification = (email) => ({
    type: ActionTypes.RESEND_VERIFICATION_EMAIL,
    payload: {
        request: {
            url: `/api/auth/send-email-confirmation`,
            method: "post",
            data: {
                email
            }
        }
    }
})

export const signup = (email, password, username, firstname, lastname, profileImage, code, platform, team, uname, id, module, trigger, slug ) => ({
    type: ActionTypes.SIGNUP,
    payload: {
        request: {
            url: (team) ? `/api/auth/local/register?code=${code}&team=${team}` : (code) ? `/api/auth/local/register?code=${code}&platform=${platform}` : (uname && id && module && trigger) || (module==="profile" && username && trigger) ? `/api/auth/local/register?uname=${uname}&id=${id}&module=${module}&trigger=${trigger}&slug=${slug}` : `/api/auth/local/register`,
            method: "post",
            data: {
                email,
                password,
                username,
                firstname,
                lastname,
                profilePhoto:profileImage
            }
        }
    }
})

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

export const forgotPassword = (email) => ({
    type: ActionTypes.FORGOT_PASSWORD,
    payload: {
        request: {
            url: `/api/auth/forgot-password`,
            method: "post",
            data: {
                email
            }
        }
    }
})

export const disableMsg = (data) => (
    {
      type: ActionTypes.DISABLE_MSG,
      payload: {
        data
      }
    }
  )

export const resetPassword = (code, password, passwordConfirmation) => ({
    type: ActionTypes.RESET_PASSWORD,
    payload: {
        request: {
            url: `/api/auth/reset-password`,
            method: "post",
            data: {
                code,
                password,
                passwordConfirmation
            }
        }
    }
})

export const callSocialLoginCallback = (provider, search) => ({
    type: ActionTypes.SOCIAL_LOGIN_CALLBACK,
    payload: {
        request: {
            url: `/api/auth/${provider}/callback?${search}`,
            method: "get"
        }
    }
})

export const setSocialLoginDetails = (data) => ({
    type: ActionTypes.SET_SOCIAL_LOGIN_DETAILS,
    payload: {
        data
    }
})

export const setSocialLoginLoader = (status) => ({
    type: ActionTypes.SET_SOCIAL_LOGIN_LOADER,
    status
})

export const autoGenerateSeoDetails = (queryParams) => ({
    type: ActionTypes.AUTO_GENERATE_SEO_DETAILS,
    payload: {
        request: {
            url: `/api/generate-ai-seo?${queryParams}`,
            method: "post"
        }
    }
})

export const verifyEmail = (code) => ({
    type: ActionTypes.VERIFY_EMAIL,
    payload: {
        request: {
            url: `/api/auth/email-confirmation?confirmation=${code}`,
            method: "get"
        }
    }
})

export const fetchProfileImage = async (email) => {
    try {
      const response = await fetch('https://avatarapi.com/v2/api.aspx', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          username: process.env.NEXT_PUBLIC_AVATAR_USERNAME,
          password: process.env.NEXT_PUBLIC_AVATAR_PASSWORD,
          email: email,
          provider:"Cache,Gravatar,Google,Microsoft"
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  };
  
  