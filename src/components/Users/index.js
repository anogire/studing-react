import React from 'react';
import { connect } from 'react-redux';

import { UsersList } from './UsersList';
import { usersList } from '../../actions/selectors';
import { getAll, deleteItem } from '../../actions/actions';

// const mapStateToProps = (state) => ({
//   users: usersList(state)
// });

function mapStateToProps(state) {
  return {
    users: usersList(state)
  }
};

const mapDispatchToProps = {
  getUsers: () => getAll(),
  remove: (id) => deleteItem(id)
}


class _Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users, remove } = this.props;
    return (<UsersList users={users} deleteUser={(value) => remove(value)} />)
  }

}

export const Users = connect(mapStateToProps, mapDispatchToProps)(_Users);