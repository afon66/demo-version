import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_PROFILE_DESC = 'SET_PROFILE_DESC'
const SET_STATUS = 'SET_STATUS'

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: 'It\'s my first post', likesCount: 11 },
    { id: 3, message: 'Blabla', likesCount: 11 },
    { id: 4, message: 'Dada', likesCount: 11 }
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.value,
        likesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case SET_PROFILE_DESC: {
      return {
        ...state,
        profile: action.profile
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    default:
      return state;
  }
}

export const addPost = (value) => ({ type: ADD_POST, value })
export const setProfileDesc = (profile) => ({ type: SET_PROFILE_DESC, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const getProfile = (userId) => async (dispatch) => {
  let data = await usersAPI.getProfile(userId)
  dispatch(setProfileDesc(data));
}

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status)

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export default profileReducer;