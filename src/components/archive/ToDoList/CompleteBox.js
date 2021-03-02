import React from 'react';
import { connect } from 'react-redux';
import { checkItem } from '../../store/actions';

const mapStateToProps = (state, ownProps) => ({
  value: state.todoList[ownProps.index].done
});

const mapDispatchToProps = {
  check: checkItem
};

function _CompleteBox({ index, value, check }) {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={event => check(index, event.target.checked)}
    />
  );
}

export const CompleteBox = connect(mapStateToProps, mapDispatchToProps)(_CompleteBox);