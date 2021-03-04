import React from 'react';
import { connect } from 'react-redux';

import { UsersList } from './UsersList';
import { USERS } from '../../actions/api_consts';
import { usersList } from '../../actions/selectors';
import { getAll, deleteItem } from '../../actions/actions';

const mapStateToProps = (state) => ({
  users: usersList(state)
});

const mapDispatchToProps = {
  getUsers: () => getAll(USERS),
  remove: (id) => deleteItem(USERS, id)
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