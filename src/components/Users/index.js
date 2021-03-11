import React from 'react';
import { connect } from 'react-redux';

import { UsersList } from './UsersList';
import { usersFetch, userDelete, selectUsersList } from '../../store/users';
import { albumsFetch, albumsByUserIdDelete, selectAlbumsForUser } from '../../store/albums';
import { selectPhotosForAlbum, photosByAlbumIdDelete, photosFetch } from '../../store/photos';


const mapStateToProps = (state) => ({
  users: selectUsersList(state),
  albums: selectAlbumsForUser(state),
  photos: selectPhotosForAlbum(state)
});

const mapDispatchToProps = {
  getUsers: () => usersFetch(),
  getPhotos: () => photosFetch(),
  getAlbums: () => albumsFetch(),
  remove: (id) => userDelete(id),
  deleteAlbumsByUserId: (albums) => albumsByUserIdDelete(albums),
  deletePhotosByAlbumId: (photos) => photosByAlbumIdDelete(photos),
}

class _Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getAlbums();
    this.props.getPhotos();
  }

  render() {
    const { users, albums } = this.props;
    return (
      <UsersList
        users={users}
        albums={albums}
        deleteUser={this.deleteMethod}
      />)
  }

  deleteMethod = async (value) => {
    const { remove, photos, albums, deleteAlbumsByUserId, deletePhotosByAlbumId } = this.props;

    if (albums[value] && albums[value] !== []) {

      const photosList = albums[value].reduce(function (concat, album) {
        if (photos[album.id]) {
          return concat.concat(photos[album.id]);
        } else {
          return concat.concat([]);
        }
      }, []); //собрать все фотографии с альбомов

      if (photosList && photosList.length !== 0) {
        await deletePhotosByAlbumId(photosList); //удалить все фотографии
      }
      await deleteAlbumsByUserId(albums[value]); //удалить все альбомы
    }
    await remove(value) //удалить пользователя
  }


}

export const Users = connect(mapStateToProps, mapDispatchToProps)(_Users);