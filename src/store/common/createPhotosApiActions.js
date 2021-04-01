import { createRequestAction } from './createRequestAction';

export function createPhotosApiActions(baseActionType, api) {
  const deleteAllPhotosAction = createRequestAction(baseActionType + '/DELETE_ALL', item => api.deletePhotosByAlbumId(item));

  return {
    deleteAllPhotos: deleteAllPhotosAction
  };
}