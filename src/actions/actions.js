import dataService from '../services/rest.service';
import { getDataSuccess, getDataError, deleteError, updateError, createError } from './messages';

export function getAll(base) {
  return async dispatch => {
    try {
      const response = await dataService.getAll(base);
      const action = getDataSuccess(response.data);
      dispatch(action)
    } catch (error) {
      dispatch(getDataError(base))
    }
  }
};

export function deleteItem(base, id) {
  return async dispatch => {
    try {
      await dataService.delete(base, id);
      dispatch(getAll(base));
    } catch (error) {
      dispatch(deleteError(base, { id: id }))
    }
  }
};

export function updateItem(base, id, data) {
  return async dispatch => {
    try {
      await dataService.update(base, id, data);
      dispatch(getAll(base));
    } catch (error) {
      dispatch(updateError(base, { id: id, data: data }))
    }
  }
};

export function addItem(base, data) {
  return async dispatch => {
    try {
      await dataService.create(base, data);
      dispatch(getAll(base));
    } catch (error) {
      dispatch(createError(base, { data: data }))
    }
  }
};