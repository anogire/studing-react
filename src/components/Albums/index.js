import React from 'react';
import { connect } from 'react-redux';

import { AlbumsList } from './AlbumsList';
import { selectUsersMap, usersFetch } from '../../store/users';
import { selectAlbumsList, albumDelete, albumsFetch } from '../../store/albums';
import { photosByAlbumIdDelete, photosFetch, selectPhotosForAlbum } from '../../store/photos';


const mapStateToProps = (state) => ({
  albums: selectAlbumsList(state),
  users: selectUsersMap(state),
  photos: selectPhotosForAlbum(state)
});

const mapDispatchToProps = {
  getAlbums: () => albumsFetch(),
  getUsers: () => usersFetch(),
  getPhotos: () => photosFetch(),
  remove: (id) => albumDelete(id),
  deletePhotosByAlbumId: (photos) => photosByAlbumIdDelete(photos),
}

class _Albums extends React.Component {

  componentDidMount() {
    this.props.getAlbums();
    this.props.getUsers();
    this.props.getPhotos();
  }

  render() {
    const { photos, albums, users } = this.props;
    return (
      <AlbumsList
        albums={albums}
        users={users}
        photos={photos}
        deleteAlbum={this.deleteMethod}
      />
    );
  }

  deleteMethod = async (value) => {
    const { photos, remove, deletePhotosByAlbumId } = this.props;

    if (photos[value] && photos[value] !== []) {
      await deletePhotosByAlbumId(photos[value]); //удалить все фотографии
    }
    await remove(value) //удалить альбом
  }


}

export const Albums = connect(mapStateToProps, mapDispatchToProps)(_Albums);