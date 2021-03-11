export function selectAlbumsList(state) {
  return state.albums.list;
}

export function selectAlbumsForUser(state) {
  return state.albums.forUser;
}

export function selectAlbumsMap(state) {
  return state.albums.map;
}