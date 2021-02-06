export const addItem = (text) => ({
  text,
  type: 'ITEM_ADD'
});

export const editItem = (id, text) => ({
  id,
  text,
  type: 'ITEM_EDIT'
});

export const updateItem = (text) => ({
  text,
  type: 'ITEM_UPDATE'
});

export const deleteItem = (id) => ({
  id,
  type: 'ITEM_DELETE'
});

export const cancelChanges = () => ({
  type: 'CANCEL_CHANGES'
});

export const checkItem = (id, value) => ({
  id,
  value,
  type: 'COMPLETED_CHANGE'
});

export const changeText = (value) => ({
  value,
  type: 'TASK_CHANGE'
});