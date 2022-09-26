export const SET_USER_NICKNAME = 'SET_USER_NICKNAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_ACCESSTOKEN = 'SET_USER_ACCESSTOKEN';
export const SET_USER_REFRESHTOKEN = 'SET_USER_REFRESHTOKEN';

export const setNickname = (nickname) => (dispatch) => {
  dispatch({
    type: SET_USER_NICKNAME,
    payload: nickname,
  });
};

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_NICKNAME,
    payload: email,
  });
};

export const setAccessToken = (accessToken) => (dispatch) => {
  dispatch({
    type: SET_USER_NICKNAME,
    payload: accessToken,
  });
};

export const setRefreshToken = (refreshToken) => (dispatch) => {
  dispatch({
    type: SET_USER_NICKNAME,
    payload: refreshToken,
  });
};
