import { PHOTOS } from '../api-connect/api_consts';
import photosAPI from '../api-connect/photosAPI';
import { createRestApiActions, createPhotosApiActions } from '../common';

const photosActions = createRestApiActions(PHOTOS, photosAPI);
const photosSpecActions = createPhotosApiActions(PHOTOS, photosAPI);

export const photosFetch = photosActions.getAll;
export const photoCreate = photosActions.create;
export const photoUpdate = photosActions.update;
export const photoDelete = photosActions.delete;

export const photosByAlbumIdDelete = photosSpecActions.deleteAllPhotos;