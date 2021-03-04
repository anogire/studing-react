import { DATA_GET_SUCCESS, DATA_GET_ERROR, DATA_DELETE_ERROR, DATA_UPDATE_ERROR, DATA_CREATE_ERROR } from './types';

export const getDataError = (base, param) => ({
  base,
  param,
  type: DATA_GET_ERROR
})

export const deleteError = (base, param) => ({
  base,
  param,
  type: DATA_DELETE_ERROR
})

export const updateError = (base, param) => ({
  base,
  param,
  type: DATA_UPDATE_ERROR
})

export const createError = (base, param) => ({
  base,
  param,
  type: DATA_CREATE_ERROR
})

export const getDataSuccess = (data) => ({
  data,
  type: DATA_GET_SUCCESS
})