import React from 'react';
import { connect } from 'react-redux';

import { AlbumsList } from './AlbumsList';
import { ALBUMS, USERS } from '../../actions/api_consts';
import { data } from '../../actions/selectors';
import { deleteItem, getAllData } from '../../actions/actions';


function mapStateToProps(state) {
  // нужно что-то придумать с selectors, чтобы не было [0], [1] ...
  return {
    albums: data(state)[0],
    users: data(state)[1]
  }
};

const mapDispatchToProps = {
  getAllData: () => getAllData([ALBUMS, USERS]),
  // getAlbums: () => getAll(ALBUMS),
  // getUsers: () => getAll(USERS),
  remove: (id) => deleteItem(ALBUMS, id)
}

class _Albums extends React.Component {

  componentDidMount() {
    this.props.getAllData();
  }

  render() {
    const { albums, users, remove } = this.props;

    return (albums ? <AlbumsList albums={albums} users={users} deleteAlbum={(value) => remove(value)} /> : null);
  }

}

export const Albums = connect(mapStateToProps, mapDispatchToProps)(_Albums);