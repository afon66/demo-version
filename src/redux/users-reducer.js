import { usersAPI } from "../api/api";
import { toggleIsFetching } from "../redux/common-reducer";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

let initialState = {
  users: [],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  followingInProgress: [],
};

let followUnfollowCase = (state, action, boolean) => {
  return {
    ...state,
    users: state.users.map(u => {
      if (u.id === action.userId) {
        return { ...u, followed: boolean }
      }
      return u;
    })
  }
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return followUnfollowCase(state, action, true)
    case UNFOLLOW:
      return followUnfollowCase(state, action, false)
    case SET_USERS: {
      return { ...state, users: action.users }
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage }
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count }
    }
    case TOGGLE_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId)
      }
    }
    default:
      return state;
  }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));

  let data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setUsersTotalCount(data.totalCount));
}

let followUnfollowFunc = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId));
  let data = await apiMethod(userId)
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
  followUnfollowFunc(dispatch, userId, usersAPI.follow, followSuccess)
}

export const unfollow = (userId) => async (dispatch) => {
  followUnfollowFunc(dispatch, userId, usersAPI.unfollow, unfollowSuccess)
}

export default usersReducer;