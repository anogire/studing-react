import dataService from '../services/rest.service';
import { getDataSuccess, getDataError, deleteError, updateError, createError } from './messages';

export function getAll() {
  return async dispatch => {
    try {
      const response = await dataService.getAll();
      const action = getDataSuccess(response.data);
      dispatch(action)
    } catch (error) {
      dispatch(getDataError())
    }
  }
};

export function deleteItem(id) {
  return async dispatch => {
    try {
      await dataService.delete(id);
      dispatch(getAll());
    } catch (error) {
      dispatch(deleteError())
    }
  }
};

export function updateItem(id, data) {
  return async dispatch => {
    try {
      await dataService.update(id, data);
      dispatch(getAll());
    } catch (error) {
      dispatch(updateError())
    }
  }
};

export function addItem(data) {
  return async dispatch => {
    try {
      await dataService.create(data);
      dispatch(getAll());
    } catch (error) {
      dispatch(createError())
    }
  }
};