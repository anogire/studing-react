import dataService from './rest.service';
import { getUsersSuccess, getUsersError, deleteUserError, updateUserError, createUserError } from './messages';

export function getAllUsers() {
  return async dispatch => {
    try {
      const response = await dataService.getAll();
      const action = getUsersSuccess(response.data);
      dispatch(action)
    } catch (error) {
      dispatch(getUsersError())
    }
  }
};

export function deleteUser(id) {
  return async dispatch => {
    try {
      await dataService.delete(id);
      dispatch(getAllUsers());
    } catch (error) {
      dispatch(deleteUserError())
    }
  }
};

export function updateUser(id, data) {
  return async dispatch => {
    try {
      await dataService.update(id, data);
      dispatch(getAllUsers());
    } catch (error) {
      dispatch(updateUserError())
    }
  }
};

export function createUser(data) {
  return async dispatch => {
    try {
      await dataService.create(data);
      dispatch(getAllUsers());
    } catch (error) {
      dispatch(createUserError())
    }
  }
};


// export function getAllData(bases) {
//   let resultData = {};
//   return async dispatch => {
//     try {
//       for (const base of bases) {
//         const response = await dataService.getAll(base);
//         resultData = {
//           ...resultData,
//           [base]: response.data,
//         }
//       }
//       const action = getDataSuccess(resultData);
//       dispatch(action)
//     } catch (error) {
//       dispatch(getDataError(bases))
//     }
//   }
// };