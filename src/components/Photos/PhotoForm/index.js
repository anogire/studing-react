import React from 'react';
import { connect } from 'react-redux';

import { ShowFormPhoto } from './ShowFormPhoto';
import { selectPhotosMap, photoCreate, photoUpdate } from '../../../store/photos';
import { selectAlbumsList, albumsFetch } from '../../../store/albums';

function mapStateToProps(state, ownProps) {
  const currentId = (ownProps.match.params.id) ? ownProps.match.params.id : null;
  return (
    {
      id: currentId,
      photo: (currentId) ?
        selectPhotosMap(state)[currentId] :
        null,
      albums: selectAlbumsList(state)
    }
  )
};

const mapDispatchToProps = {
  add: (value) => photoCreate(value),
  update: (value) => photoUpdate(value),
  getAlbums: () => albumsFetch(),
};

class _PhotoForm extends React.Component {
  componentDidMount() {
    this.props.getAlbums();
  }

  render() {
    const { photo, albums, add, update } = this.props;
    return (
      <ShowFormPhoto
        photo={photo}
        albums={albums}
        addValue={(value) => add(value)}
        updateValue={(value) => update(value)}
      />
    )

  }

}

export const PhotoForm = connect(mapStateToProps, mapDispatchToProps)(_PhotoForm);