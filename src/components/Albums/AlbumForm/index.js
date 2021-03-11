import React from 'react';
import { connect } from 'react-redux';

import { ShowFormAlbum } from './ShowFormAlbum';
import { selectAlbumsMap, albumCreate, albumUpdate } from '../../../store/albums';
import { selectUsersList, usersFetch } from '../../../store/users';

function mapStateToProps(state, ownProps) {
  const currentId = (ownProps.match.params.id) ? ownProps.match.params.id : null;
  return (
    {
      id: currentId,
      album: (currentId) ?
        selectAlbumsMap(state)[currentId] :
        null,
      users: selectUsersList(state)
    }
  )
};

const mapDispatchToProps = {
  add: (value) => albumCreate(value),
  update: (value) => albumUpdate(value),
  getUsers: () => usersFetch(),
};

class _AlbumForm extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { album, users, add, update } = this.props;
    return (
      <ShowFormAlbum album={album}
        users={users}
        addValue={(value) => add(value)}
        updateValue={(value) => update(value)} />
    )

  }

}

export const AlbumForm = connect(mapStateToProps, mapDispatchToProps)(_AlbumForm);








// import { connect } from 'react-redux';

// import { ShowForm } from './ShowForm';
// import { selectAlbumsMap } from '../../../store/albums';
// import { albumCreate, albumUpdate } from '../../../store/albums';
// import { selectUsersList, usersFetch } from '../../../store/users';

// function mapStateToProps(state, ownProps) {
//   const currentId = (ownProps.match.params.id) ? ownProps.match.params.id : null;

//   return (
//     {
//       id: currentId,
//       album: (currentId) ?
//         selectAlbumsMap(state)[currentId] :
//         null,
//       users: selectUsersList(state)
//     }
//   )
// };

// const mapDispatchToProps = {
//   add: (value) => albumCreate(value),
//   update: (value) => albumUpdate(value),
//   getUsers: () => usersFetch(),
// };


// function _AlbumForm({ album, users, add, update }) {

//   return (
//     <ShowForm album={album}
//       users={users}
//       addValue={(value) => add(value)}
//       updateValue={(value) => update(value)} />
//   )
// }

// export const AlbumForm = connect(mapStateToProps, mapDispatchToProps)(_AlbumForm);