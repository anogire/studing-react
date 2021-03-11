import { ALBUMS_GET_SUCCESS, ALBUMS_GET_ERROR, ALBUMS_DELETE_ERROR, ALBUMS_UPDATE_ERROR, ALBUMS_CREATE_ERROR } from './types';

export const getAlbumsError = () => ({
  type: ALBUMS_GET_ERROR
})

export const deleteAlbumError = () => ({
  type: ALBUMS_DELETE_ERROR
})

export const updateAlbumError = () => ({
  type: ALBUMS_UPDATE_ERROR
})

export const createAlbumError = () => ({
  type: ALBUMS_CREATE_ERROR
})

export const getAlbumsSuccess = (albums) => ({
  albums,
  type: ALBUMS_GET_SUCCESS
})