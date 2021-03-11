import dataService from './rest.service';
import { getAlbumsSuccess, getAlbumsError, deleteAlbumError, updateAlbumError, createAlbumError } from './messages';


export function getAllAlbums() {
  return async dispatch => {
    try {
      const response = await dataService.getAll();
      const action = getAlbumsSuccess(response.data);
      dispatch(action)
    } catch (error) {
      dispatch(getAlbumsError())
    }
  }
};

export function deleteAlbum(id) {
  return async dispatch => {
    try {
      await dataService.delete(id);
      dispatch(getAllAlbums());
    } catch (error) {
      dispatch(deleteAlbumError())
    }
  }
};

export function updateAlbum(id, data) {
  return async dispatch => {
    try {
      await dataService.update(id, data);
      dispatch(getAllAlbums());
    } catch (error) {
      dispatch(updateAlbumError())
    }
  }
};

export function createAlbum(data) {
  return async dispatch => {
    try {
      await dataService.create(data);
      dispatch(getAllAlbums());
    } catch (error) {
      dispatch(createAlbumError())
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