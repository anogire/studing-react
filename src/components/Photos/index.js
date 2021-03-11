import React from 'react';
import { connect } from 'react-redux';

import { PhotosList } from './PhotosList';
import { selectAlbumsMap, albumsFetch } from '../../store/albums';
import { selectPhotosList, photoDelete, photosFetch } from '../../store/photos';


const mapStateToProps = (state) => ({
  photos: selectPhotosList(state),
  albums: selectAlbumsMap(state)
});

const mapDispatchToProps = {
  getPhotos: () => photosFetch(),
  getAlbums: () => albumsFetch(),
  remove: (id) => photoDelete(id),
}

class _Photos extends React.Component {

  componentDidMount() {
    this.props.getPhotos();
    this.props.getAlbums();
  }

  render() {
    const { photos, albums, remove } = this.props;
    return (
      <PhotosList
        photos={photos}
        albums={albums}
        deletePhoto={(value) => remove(value)}
      />
    );
  }

}

export const Photos = connect(mapStateToProps, mapDispatchToProps)(_Photos);