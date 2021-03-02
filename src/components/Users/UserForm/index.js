import { connect } from 'react-redux';

import { ShowForm } from './ShowForm';
import { usersList } from '../../../actions/selectors';
import { addItem, updateItem } from '../../../actions/actions';

function mapStateToProps(state, ownProps) {
  const currentId = (ownProps.match.params.id) ? ownProps.match.params.id : null;
  return (
    {
      id: currentId,
      user: (currentId) ?
        usersList(state).find(user => user.id === currentId) :
        null
    }
  )
};

const mapDispatchToProps = {
  add: addItem,
  update: updateItem,
};


function _UserForm({ user, id, add, update }) {
  return (
    <ShowForm user={user}
      addValue={(value) => add(value)}
      updateValue={(value) => update(id, value)} />
  )
}

export const UserForm = connect(mapStateToProps, mapDispatchToProps)(_UserForm);