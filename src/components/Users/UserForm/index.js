import { connect } from 'react-redux';

import { ShowFormUser } from './ShowFormUser';
import { selectUsersMap, userCreate, userUpdate } from '../../../store/users';

function mapStateToProps(state, ownProps) {
  const currentId = (ownProps.match.params.id) ? ownProps.match.params.id : null;
  return (
    {
      id: currentId,
      user: (currentId) ?
        selectUsersMap(state)[currentId] :
        null
    }
  )
};

const mapDispatchToProps = {
  add: (value) => userCreate(value),
  update: (value) => userUpdate(value),
};


function _UserForm({ user, add, update }) {
  return (
    <ShowFormUser
      user={user}
      addValue={(value) => add(value)}
      updateValue={(value) => update(value)}
    />
  )
}

export const UserForm = connect(mapStateToProps, mapDispatchToProps)(_UserForm);