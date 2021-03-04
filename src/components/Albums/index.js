import React from 'react';
import { connect } from 'react-redux';

import { AlbumsList } from './AlbumsList';
import { ALBUMS, USERS } from '../../actions/api_consts';
import { usersList, albumsList } from '../../actions/selectors';
import { getAll, deleteItem } from '../../actions/actions';

// const mapStateToProps = (state) => ({
//   users: usersList(state),
//   albums: albumsList(state)
// });

function mapStateToProps(state) {
  return {
    users: usersList(state),
    albums: albumsList(state)
  }
};

const mapDispatchToProps = {
  getAlbums: () => getAll(ALBUMS),
  getUsers: () => getAll(USERS),
  remove: (id) => deleteItem(ALBUMS, id)
}

class _Albums extends React.Component {

  componentDidMount() {
    this.props.getUsers();
    this.props.getAlbums();
  }

  render() {
    console.log('albums: ', this.props.albums);
    console.log('users: ', this.props.users);
    const { albums, remove } = this.props;
    return (<AlbumsList albums={albums} deleteAlbum={(value) => remove(value)} />)
  }

}

export const Albums = connect(mapStateToProps, mapDispatchToProps)(_Albums);