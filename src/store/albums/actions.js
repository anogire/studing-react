import { ALBUMS } from '../api-connect/api_consts';
import albumsAPI from '../api-connect/albumsAPI';
import { createRestApiActions, createAlbumsApiActions } from '../common';

const albumsActions = createRestApiActions(ALBUMS, albumsAPI);
const albumsSpecActions = createAlbumsApiActions(ALBUMS, albumsAPI);

export const albumsFetch = albumsActions.getAll;
export const albumCreate = albumsActions.create;
export const albumUpdate = albumsActions.update;
export const albumDelete = albumsActions.delete;

export const albumsByUserIdSelect = albumsSpecActions.select;
export const albumsByUserIdDelete = albumsSpecActions.deleteAllAlbums;
