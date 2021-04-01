import { createRequestAction } from './createRequestAction';

export function createAlbumsApiActions(baseActionType, api) {

  //не используется
  const selectAction = createRequestAction(baseActionType + '/SELECT', item => api.getAlbumsByUserId(item));

  const deleteAllAlbumsAction = createRequestAction(baseActionType + '/DELETE_ALL', item => api.deleteAlbumsByUserId(item));

  return {
    select: selectAction,
    deleteAllAlbums: deleteAllAlbumsAction
  };
}