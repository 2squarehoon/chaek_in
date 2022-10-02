import {
  SET_USER_NICKNAME,
  SET_USER_EMAIL,
  SET_USER_ACCESSTOKEN,
  SET_USER_REFRESHTOKEN,
  SET_FAKE_ACCESSTOKEN,
} from './actions';

const initialState = {
  nickname: '',
  email: '',
  accessToken: '',
  refreshToken: '',
};

function userReducer(
  state = { nickname: '', email: '', accessToken: '', refreshToken: '', fakeAccessToken: '' },
  action,
) {
  switch (action.type) {
    case SET_USER_NICKNAME:
      return { ...state, nickname: action.payload };
    case SET_USER_EMAIL:
      return { ...state, email: action.payload };
    case SET_USER_ACCESSTOKEN:
      return { ...state, accessToken: action.payload };
    case SET_USER_REFRESHTOKEN:
      return { ...state, refreshToken: action.payload };
    // 회원가입하고 초기평점 수집할 때 accessToken이 필요해서 따로 파둠
    case SET_FAKE_ACCESSTOKEN:
      return { ...state, fakeAccessToken: action.payload };
    default:
      return state;
  }
}

export default userReducer;
