export const SET_USER_NICKNAME = 'SET_USER_NICKNAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_ACCESSTOKEN = 'SET_USER_ACCESSTOKEN';
export const SET_USER_REFRESHTOKEN = 'SET_USER_REFRESHTOKEN';

export const setNickname = (userNickname) => (dispatch) => {
  dispatch({
    type: SET_USER_NICKNAME,
    payload: userNickname,
  });
};

export const setEmail = (userEmail) => (dispatch) => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: userEmail,
  });
};

export const setAccessToken = (aToken) => (dispatch) => {
  dispatch({
    type: SET_USER_ACCESSTOKEN,
    payload: aToken,
  });
};

export const setRefreshToken = (rToken) => (dispatch) => {
  dispatch({
    type: SET_USER_REFRESHTOKEN,
    payload: rToken,
  });
};
