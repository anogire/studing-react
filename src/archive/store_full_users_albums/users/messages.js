import { USERS_GET_SUCCESS, USERS_GET_ERROR, USERS_DELETE_ERROR, USERS_UPDATE_ERROR, USERS_CREATE_ERROR } from './types';

export const getUsersError = () => ({
  type: USERS_GET_ERROR
})

export const deleteUserError = () => ({
  type: USERS_DELETE_ERROR
})

export const updateUserError = () => ({
  type: USERS_UPDATE_ERROR
})

export const createUserError = () => ({
  type: USERS_CREATE_ERROR
})

export const getUsersSuccess = (users) => ({
  users,
  type: USERS_GET_SUCCESS
})