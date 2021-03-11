
import { ALBUMS } from '../api-connect/api_consts';
import albumsAPI from '../api-connect/albumsAPI';
import { createRestApiActions } from '../common';

const albumsActions = createRestApiActions(ALBUMS, albumsAPI);

export const albumsFetch = albumsActions.getAll;
export const albumCreate = albumsActions.create;
export const albumUpdate = albumsActions.update;
export const albumDelete = albumsActions.delete;

export const albumsByUserIdSelect = albumsActions.select;
export const albumsByUserIdDelete = albumsActions.deleteAllAlbums;




// import userService from './service';
// import { createRequestAction } from '../common';

// export const usersFetch = createRequestAction('USERS.FETCH', async () => {
//   const result = await userService.getAll();
//   return result.data;
// });

// export const userCreate = createRequestAction('USERS.CREATE', item => userService.create(item));
// export const userUpdate = createRequestAction('USERS.UPDATE', item => userService.update(item));
// //export const userDelete = createRequestAction('USERS.DELETE', item => userService.delete(item));

// export const userDelete = createRequestAction('USERS.FETCH', async (item) => {
//   await userService.delete(item);
//   const result = await userService.getAll();
//   return result.data;
// });

