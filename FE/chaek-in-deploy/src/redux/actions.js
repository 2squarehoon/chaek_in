export const SET_USER_NICKNAME = 'SET_USER_NICKNAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_ACCESSTOKEN = 'SET_USER_ACCESSTOKEN';
export const SET_USER_REFRESHTOKEN = 'SET_USER_REFRESHTOKEN';
export const SET_FAKE_ACCESSTOKEN = 'SET_FAKE_ACCESSTOKEN';

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
// 회원가입하고 초기평점 수집할 때 accessToken이 필요해서 따로 파둠
export const setFakeAccessToken = (fAToken) => (dispatch) => {
  dispatch({
    type: SET_FAKE_ACCESSTOKEN,
    payload: fAToken,
  });
};
